import React from "react";
import Article from "./Article";
import "./displayFeeds.css";

class DisplayFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      noFeeds: false
    };
  }

  async componentDidMount() {
    const response = await fetch("/get-articles", { method: "post" });
    if (response.status === 500) {
      this.setState({ noFeeds: true });
    } else {
      let articleList = await response.json();
      if (articleList.length === 0) {
        this.setState({noFeeds: true});
      } else {
        this.setState({ articles: articleList });
      }
    }
  }

  render() {
    let { articles, noFeeds } = this.state;

    if (articles && !noFeeds) {
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
