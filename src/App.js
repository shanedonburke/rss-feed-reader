import React from "react";
import { Route, Switch } from "react-router-dom";
import LinkNav from "./components/LinkNav";
import NewFeedInput from "./components/NewFeedInput";
import getFeed from "./components/FeedList/FeedList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayFeed from "./components/FeedList/displayFeeds";

/**
 * Main container component for app, including routes
 */
function App() {
  // Render title, navbar, and routes
  return (
    <div className="App">
      <div className="header">
        <h1>Rss Feed Reader</h1>
        <p></p>
      </div>

        <LinkNav />
        <Route exact path="/addArticles"><NewFeedInput/></Route>
        <Switch>
          <Route exact path="/">
            <div className="row">
              <DisplayFeed/>
            </div>
          </Route>
          <Route path="/my-feeds" component={getFeed}/>
        </Switch>
      </div>
  );
}

export default App;
