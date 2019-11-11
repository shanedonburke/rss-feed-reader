import React from 'react'
var Feed = require('rss-to-json');

class NewFeedInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      feed: {}
  };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const data = {
        feedURL: this.state.value,
        feed: this.state.feed
    }

    Feed.load(this.state.value, (err, rss) => {
      console.log(rss);
      this.setState({feed: rss});
      data.feed = rss;
      console.log(this.state.feed);
    });

    fetch('/add-feed', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
     }).then((response) => {
       alert(response.text());
     });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Enter new feed URL: 
          <input type="text" name="url" placeholder="Enter URL here" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewFeedInput;

