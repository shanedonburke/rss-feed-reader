/*jshint esversion: 6 */
"use-strict";

import React from "react";
import FeedItem from "./FeedItem";
import "./feedList.css";

function FeedList(props) {
  return <div class="flex-container feed-list">{this.feedItems()}</div>;
}

FeedList.componentDidMount = function() {
  fetch('/some/async/data')
    .then(resp => resp.json())
    .then(data => this.setState({data}));
}

FeedList.prototype.feedURLs = async function() {
  const urls = await fetch("/get-feed-list")
    .then(data => {
      return data.json();
    })
    .then(res => {
      return res.feedList;
    })
    .catch(err => {
      return err;
    });

  return await urls;
};

FeedList.prototype.feedItems = function() {
  const response = await this.feedURLs()
    .then(feedURLs => {
      feedURLs.map((value, index) => {
        return <FeedItem url={value} />;
      });
    })
    .catch(err => {
      return <div>There was an error obtaining the list of feed URLs.</div>;
    });

    return await response;
};

export default FeedList;
