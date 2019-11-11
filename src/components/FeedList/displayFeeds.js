import React from 'react';
var http = require('http');

const divStyle = {
  width: '100%',
  border: 'solid 1px black'
};

class DisplayFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: {}
    }
  }

  async componentDidMount() {
    const response = await fetch('/get-feed-list');
    let feed = await response.json();
    console.log(feed);
    this.setState({feed: feed});
    console.log(this.state.feed);
  }

  render() {
    let feed = this.state.feed;
    return (
      <div style={divStyle}>
          <h2>{feed.title}</h2>
          <h3>{feed.description}</h3>
           {feed.items && feed.items.map((item) => <div key={item.created} style={divStyle}>{item.title}</div>) }
          {
          //this.state.feed.items.map((item) => <p key={item.created}>{item.title}</p> )
          }
      </div>
    )
  }
}

export default DisplayFeed;