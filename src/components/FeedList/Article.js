import React from "react";
import "./Article.css";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this, props);
  }

  redirect(props) {
    const { url } = props;
    window.location.assign(url);
  }

  render() {
    const { title, description, thumbnail } = this.props;
    return (
      <div className="article-div" onClick={this.redirect}>
        <img src={thumbnail} alt={title} className="thumbnail" />
        <span className="article-text">
          <h6>
            <b>{title}</b>
          </h6>
          <p className="description">{description}</p>
        </span>
      </div>
    );
  }
}
