import React from "react";
import DeleteFeedButton from "./DeleteFeedButton";
import "./feedList.css";
class FeedItem extends React.Component {

  render() {
    const { url, onClick } = this.props;

    return (
      <div className="feed-item flex-container" onClick={onClick}>
        <label className="feed-item-label">{url}</label>
        <DeleteFeedButton />
      </div>
    );
  }
}

export default FeedItem;
