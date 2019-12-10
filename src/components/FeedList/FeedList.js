/*jshint esversion: 6 */
"use-strict";

import React from "react";
import FeedItem from "./FeedItem";
import "./feedList.css";

/**
 * Container component for list of feeds
 */
class FeedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noFeeds: false // True if no subscribed feeds
    };
  }

  componentDidMount() {
    // Get list of subscribed feeds
    fetch("/get-feed-list").then(response => {
      if (response.status !== 500) {
        response.json().then(data => {
          this.setState({ urls: data });
        });
      }
    });
  }

  /**
   * Deleted a feed from the internal list
   * @param {string} url - feed URL to delete
   */
  deleteFeed(url) {
    const data = {
      "url": url
    };

    let response = fetch("/delete-feed", {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });

    // Reload component
    response.then(res => {
      this.setState({ noFeeds: false });
      this.componentDidMount();
    });
  }

  /**
   * Create FeedItem component for each feed URL in list
   */
  mapURLs() {
    const items = this.state.urls.map((url, index) => (
      <FeedItem
        key={index}
        url={url}
        onClick={this.deleteFeed.bind(this, url)}
      />
    ));

    return items;
  }

  /**
   * Render list
   */
  render() {
    if ("urls" in this.state) {
      if (this.state.urls.length > 0) {
        // Render FeedItems
        const items = this.mapURLs();
        return <div className="flex-container feed-list">{items}</div>;
      } else {
        // No subscribed feeds
        return (
          <div className="error-div">
            <h3>You aren't subscribed to any feeds.</h3>
          </div>
        );
      }
    } else {
      return (
        <div className="error-div">
          <h3>YThere was an error obtaining the feed list.</h3>
        </div>
      );
    }
  }
}

export default FeedList;
