import React from 'react'

class FeedList extends React.Component {
  constructor(props) {
    super(props);
  }

  createLists() {
    let feedList;

    fetch('/get-feed-list', {
        method: 'get',
        headers: {'Content-Type':'application/json'},
    }).then(response => {
        
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

export default FeedList;

