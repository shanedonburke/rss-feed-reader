import React from "react";
import DeleteFeedButton from "./DeleteFeedButton"
import "./feedList.css";

function FeedItem(props) {
  return (
    <div class="feed-item flex-container">
      <label class="feed-item-label">{props.url}</label>
      <DeleteFeedButton />
    </div>
  );
}

export default FeedItem;
