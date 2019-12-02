/*jshint esversion: 6 */
"use-strict";

import React from "react";
import FeedItem from "./FeedItem";
import "./feedList.css";

class FeedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noFeeds: false
    };
  }

  componentDidMount() {
    fetch("/get-feed-list").then(response => {
      if (response.status !== 500) {
        response.json().then(data => {
          this.setState({ urls: data });
        });
      }
    });
  }

  deleteFeed(url) {
    const data = {
      "url": url
    };

    let response = fetch("/delete-feed", {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    });

    response.then(res => {
      this.setState({ noFeeds: false });
      this.componentDidMount();
    });
  }

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

  render() {
    if ("urls" in this.state) {
      if (this.state.urls.length > 0) {
        const items = this.mapURLs();
        return <div className="flex-container feed-list">{items}</div>;
      } else {
        return (
          <div className="error-div">
            <h3>You aren't subscribed to any feeds</h3>
          </div>
        );
      }
    } else {
      return (
        <div className="error-div">
          
        </div>
      );
    }
  }
}

export default FeedList;
