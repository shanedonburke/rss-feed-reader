const fs = require("fs");
const $path = require("path");

const dataDir = $path.resolve("public/data");

const feedFileTemplatePath = $path.resolve(dataDir, "feedFileTemplate.json");
const feedFilePath = $path.resolve(dataDir, "feedList.json");

async function addFeed(body) {
    let feedFileDict;

    try {
        feedFileDict = await readFeedFile(feedFilePath);
    } catch(err) {
        return Promise.reject(err);
        // try {
        //     feedFileDict = await copyTemplate();
        //     await feedFileDict.feedList.push(url);
        // } catch(err) {
        //     console.log(err);
        //     return Promise.reject(err);
        // }
    }

    await writeFeedFile(feedFilePath, feedFileDict, body);
}

async function readFeedFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function(err, data) {
            if (err) {
                reject("No feed file found.");
            } else {
                let feedFileDict = JSON.parse(data);
                resolve(feedFileDict);
            }
        });
    });
}

async function writeFeedFile(path, feedFileDict, url) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(feedFileDict), (err) => {
            if (err) {
                reject("Error writing to feed file.");
            } else {
                resolve("New feed added successfully.");
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

module.exports = {
    addFeed: addFeed,
    getFeedList: getFeedList
};