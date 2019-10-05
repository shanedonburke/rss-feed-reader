import React from 'react';
import logo from './logo.svg';
import LinkNav from './components/LinkNav'
import NewFeedInput from './components/NewFeedInput'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Rss feed reader</h1>
        <p></p>
      </div>

    <LinkNav />
    <NewFeedInput />
    <div className="row">
      <div className="column">
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
      </div>
    </div>
  </div>
  );
}

export default App;
