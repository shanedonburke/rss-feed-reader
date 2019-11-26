/*jshint esversion: 6 */
"use-strict";

import React from "react";
import FeedItem from "./FeedItem";
import "./feedList.css";

class FeedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    fetch("/get-feed-list")
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({urls: data});
      });
  }

  mapURLs() {
    const items = this.state.urls.map((value, index) => (
      <FeedItem url={value} />
    ));

    return items;
  }

  render() {
    if ("urls" in this.state) {
      const items = this.mapURLs();
      return <div class="flex-container feed-list">{items}</div>;
    } else {
      return (
        <div>
          <h2>There was an error obtaining the feed list.</h2>
        </div>
      );
    }
  }
}

export default FeedList;
