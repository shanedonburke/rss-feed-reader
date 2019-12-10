/**
 * Functions for handling file I/O for the internal feed list
 */

const fs = require("fs");
const $path = require("path");
var _ = require('lodash');
var Feed = require('rss-to-json');

// Location of feed list JSON files
const dataDir = $path.resolve("public/data");

// Template file used when first feed is added by user
const feedFileTemplatePath = $path.resolve(dataDir, "feedFileTemplate.json");
// Current feed list
const feedFilePath = $path.resolve(dataDir, "feedList.json");

/**
 * Adds a feed URL to the list
 * @param {string} url - URL of feed to add
 */
async function addFeed(url) {
    let feedFileDict;

    // Read in feed file or copy from template
    try {
        feedFileDict = await readFeedFile(feedFilePath);
    } catch(err) {
        try {
            feedFileDict = await copyTemplate();
        } catch(err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    // Add URL to list and write back to file
    const result = await feedFileDict.feedList.push(url);
    return await writeFeedFile(feedFilePath, feedFileDict);
}

/**
 * Delete a feed from the list
 * @param {string} url - feed URL to delete
 */
async function deleteFeed(url) {
    let feedFileDict;
    console.log("Deleting feed: " + url);

    // Read in feed file
    try {
        feedFileDict = await readFeedFile(feedFilePath);
    } catch(err) {
        return Promise.reject(err);
    }

    // Remove feed from list loaded from file
    const result = await new Promise((resolve, reject) => {
        // Filter out the URL we want to remove
        const newFeedList = _.filter(feedFileDict.feedList, function(u) {
            return (u !== url);
        });

        feedFileDict = {
            feedList: newFeedList
        }
        resolve("Success");
    });

    // Write back to file
    return await writeFeedFile(feedFilePath, feedFileDict);
}

/**
 * Read and parse a JSON feed file
 * @param {string} path - path to feed file in local filesystem
 */
async function readFeedFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function(err, data) {
            if (err) {
                // Feed file doesn't exist -> a feed has never been added
                reject("You aren't subscribed to any feeds.");
            } else {
                // Parse and resolve with feed list object
                let feedFileDict = JSON.parse(data);
                resolve(feedFileDict);
            }
        });
    });
}

/**
 * Write a feed list object to the local filesystem
 * @param {string} path - path where the file will be saved
 * @param {*} feedFileDict - feed list object to write
 */
async function writeFeedFile(path, feedFileDict) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(feedFileDict), (err) => {
            if (err) {
                reject("Error writing to feed file.");
            } else {
                resolve("Feed file saved successfully.");
            }
        });
    });
}

/**
 * Copy the template file to the current feed list file
 */
async function copyTemplate() {
    let templateDict;

    try {
        templateDict = await readFeedFile(feedFileTemplatePath);
    } catch(err) {
        return Promise.reject("Can't read template file.")
    }

    return new Promise((resolve, reject) => {
        fs.writeFile(feedFilePath, JSON.stringify(templateDict), (err) => {
            if (err) {
                reject("Couldn't write to feed file.");
            } else {
                resolve(templateDict);
            }
        });
    });

}

/**
 * Return the feed list as an array of URLs
 */
async function getFeedList() {
    let feedDict = await readFeedFile(feedFilePath);
    return feedDict.feedList;
}

/**
 * Get articles from all subscribed feeds
 */
async function getArticles() {
    const feedList = await getFeedList(); // Array of feed URL
    let allArticles = [];
    let feedPromises = [];

    // Get articles from each URL
    feedList.forEach((url, index, array) => {
        feedPromises.push(new Promise((resolve, reject) => {
            // Get articles from this feed and add to list
            Feed.load(url, (err, rss) => {
                if (err) {
                    reject(err);
                } else {
                    const articles = rss.items;
                    allArticles.push(...articles);
                    resolve("Success");
                }
            });
        }));
    });

    
    const results = await Promise.all(feedPromises);

    // Sort articles by date and return simplified article object array
    return new Promise((resolve, reject) => {
        // Sort by date, newest first
        const allArticlesSorted = _.sortBy(allArticles, ["created"]);
        const articlesNewestFirst = _.reverse(allArticlesSorted);

        // Map to new, simplified object
        const articles = articlesNewestFirst.map(article => {
            return {
                title: article.title,
                description: article.description,
                thumbnail: article.media.thumbnail[0].url[0],
                created: new Date(article.created).toDateString(),
                url: article.link
            }
        });
        resolve(articles);
    });
}

module.exports = {
    addFeed: addFeed,
    getFeedList: getFeedList,
    getArticles: getArticles,
    deleteFeed: deleteFeed
};