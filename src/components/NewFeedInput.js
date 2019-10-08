import React from 'react'

class NewFeedInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('RSS Feed added: ' + this.state.value);
    event.preventDefault();
    
    const data = {
        feed_url: this.state.value
    }
    

    fetch('/add-feed', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
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

