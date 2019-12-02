const fs = require("fs");
const $path = require("path");
var _ = require('lodash');
var Feed = require('rss-to-json');

const dataDir = $path.resolve("public/data");

const feedFileTemplatePath = $path.resolve(dataDir, "feedFileTemplate.json");
const feedFilePath = $path.resolve(dataDir, "feedList.json");

async function addFeed(url) {
    let feedFileDict;

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
    const result = await feedFileDict.feedList.push(url);
    return await writeFeedFile(feedFilePath, feedFileDict);
}

async function deleteFeed(url) {
    let feedFileDict;
    console.log("Deleting feed: " + url);
    try {
        feedFileDict = await readFeedFile(feedFilePath);
    } catch(err) {
        return Promise.reject(err);
    }

    const result = await new Promise((resolve, reject) => {
        const newFeedList = _.filter(feedFileDict.feedList, function(u) {
            return (u !== url);
        });

        feedFileDict = {
            feedList: newFeedList
        }
        resolve("Success");
    });

    return await writeFeedFile(feedFilePath, feedFileDict);
}

async function readFeedFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function(err, data) {
            if (err) {
                reject("You aren't subscribed to any feeds.");
            } else {
                let feedFileDict = JSON.parse(data);
                resolve(feedFileDict);
            }
        });
    });
}

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

async function copyTemplate(path) {
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

async function getFeedList() {
    let feedDict = await readFeedFile(feedFilePath);
    return feedDict.feedList;
}

async function getArticles() {
    const feedList = await getFeedList();
    let allArticles = [];
    let feedPromises = [];

    feedList.forEach((url, index, array) => {
        feedPromises.push(new Promise((resolve, reject) => {
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

    return new Promise((resolve, reject) => {
        const allArticlesSorted = _.sortBy(allArticles, ["created"]);
        const articlesNewestFirst = _.reverse(allArticlesSorted);
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