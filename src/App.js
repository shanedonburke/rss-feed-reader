import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import LinkNav from "./components/LinkNav";
import NewFeedInput from "./components/NewFeedInput";
import getFeed from "./components/FeedList/FeedList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayFeed from "./components/FeedList/displayFeeds";

function App() {
  return (
    // <BrowserRouter>
      <div className="App">
        <div className="header">
          <h1>Rss feed reader</h1>
          <p></p>
        </div>

        <LinkNav />
        <Link to="/my-feeds">Hi</Link>
        <Route exact path="/addArticles"><NewFeedInput/></Route>
        <Switch>
          <Route exact path="/home">
            <div className="row">
              <DisplayFeed/>
              {/* <div className="column">
                <h2>Article 1</h2>
                <p>content</p>
              </div>

              <div className="column">
                <h2>Article 2</h2>
                <p>Content</p>
              </div>

              <div className="column">
                <h2>Article 3</h2>
                <p>Contect</p>
              </div> */}
            </div>
          </Route>
          <Route path="/my-feeds" component={getFeed}/>
        </Switch>
      </div>
    // </BrowserRouter>
  );
}

export default App;
