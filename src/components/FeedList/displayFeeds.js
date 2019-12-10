import React from "react";
import Article from "./Article";
import "./displayFeeds.css";

/**
 * Container component wherein article cards are shown.
 */
class DisplayFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null, // Articles not yet loaded
      noFeeds: false // Will be true if no articles are available after loading
    };
  }

  async componentDidMount() {
    const response = await fetch("/get-articles", { method: "post" });

    if (response.status === 500) {
      // No articles to show due to backend error
      this.setState({ noFeeds: true });
    } else {
      let articleList = await response.json();
      if (articleList.length === 0) {
        // No articles available, usually due to no subscribed feeds
        this.setState({noFeeds: true});
      } else {
        this.setState({ articles: articleList });
      }
    }
  }

  render() {
    let {
      articles, // List of article objects
      noFeeds // True if no articles are available
    } = this.state;

    if (articles && !noFeeds) {
      // We have articles to show
      return (
        <div className="root-div">
          {articles.map((article, i) => (
            <Article
              key={i}
              title={article.title}
              description={article.description}
              thumbnail={article.thumbnail}
              url={article.url}
              created={article.created}
            />
          ))}
        </div>
      );
    } else
      // No articles to show (not yet loaded or none available)
      return (
        <div className="waiting-div">
          <h3>
            {noFeeds ? "You aren't subscribed to any feeds!" : "Please wait for feeds to load."}
          </h3>
        </div>
      );
  }
}

export default DisplayFeed;
