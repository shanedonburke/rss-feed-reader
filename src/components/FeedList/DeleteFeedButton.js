import React from "react";
import "./feedList.css";

/**
 * Component for the "Delete" button shown for feeds on 
 * the feed list page.
 * @param {Object} props - render props
 */
function DeleteFeedButton(props) {
  const {
    onClick // Deletes feed from list
  } = props;

  return <button onClick={onClick} className="delete-feed-button">Delete</button>;
}

export default DeleteFeedButton;
