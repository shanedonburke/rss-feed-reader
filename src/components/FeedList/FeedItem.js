import React from "react";
import DeleteFeedButton from "./DeleteFeedButton";
import "./feedList.css";

/**
 * This component represents a feed listing on the feed list page
 */
class FeedItem extends React.Component {

  render() {
    const {
      url, // feed URL
      onClick // Function to delete feed from list
    } = this.props;

    return (
      <div className="feed-item flex-container">
        <label className="feed-item-label">{url}</label>
        <DeleteFeedButton onClick={onClick} />
      </div>
    );
  }
}

export default FeedItem;
