
import React from 'react';
var http = require('http');

const divStyle = {
  border: 'solid 1px black'
};

const itemStyle = {
  padding: '0 150px',
  border: 'solid 1px black'
}

class DisplayFeed extends React.Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.state = {
      feed: this.props.feed
    }
  }

  async componentDidMount() {
    const response = await fetch('/get-feed-list');
    let feed = await response.json();
    console.log(feed);
    this.setState({feed: feed});
    console.log(this.state.feed);
  }

  redirect(newLink) {
    window.location.assign(newLink);
  }

  render() {
    let feed = this.state.feed;
    if (feed != null) {
      return (
        <div className={"feed-list"}>
            <h1>{feed.title}</h1>
            <h2>{feed.description}</h2>

        {feed.items && feed.items.map((item) => {
          return (<div key={item.created} className={"feed-item"} onClick={() => { this.redirect(item.link) }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          </div>)
        }) 
        }
            {
            //this.state.feed.items.map((item) => <p key={item.created}>{item.title}</p> )
            }
        </div>
      )
    }
    else return <h2>invalid feed link or CORS error encountered. Try another link</h2>
  }
}

export default DisplayFeed;