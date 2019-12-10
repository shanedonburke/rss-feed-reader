import React from "react";
import "./Article.css";

/**
 * This component represents a clickable article card, shown on the homepage
 */
export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this, props); // 
  }

  /**
   * Redirects user to external article
   * @param {Object} props - render props
   */
  redirect(props) {
    const { url } = props; // Article URL
    window.location.assign(url);
  }


  /**
   * Render component
   */
  render() {
    const { 
      title, // Article title
      description, // Article description
      thumbnail, // URL for thumbnail
      created // Publication date
    } = this.props;

    return (
      <div className="article-div" onClick={this.redirect}>
        <img src={thumbnail} alt={title} className="thumbnail" />
        <span className="article-text">
          <h6>
            <b>{title}</b>
          </h6>
          <p className="description">{description}</p>
          <i><h6 className="dateText">{created}</h6></i>
        </span>
      </div>
    );
  }
}
