import React, { Component } from 'react';

type MyProps = { };
type MyState = { value: string };

class NewFeedInput extends Component<MyProps, MyState> {
  constructor(props : MyProps) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event : any) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event : any) {
    alert('RSS Feed added: ' + this.state.value);
    event.preventDefault();
    
    const data = {
        feed_url: this.state.value
    }
    

    //link contains data we want to parse! instead of sending a post request
    //we first have to parse what was fetched from the link into workable data, THEN send a post request!!! 

    //try posting this link to the textbox: https://jsonplaceholder.typicode.com/posts?userId=10
    fetch(this.state.value)
    .then(res => res.json())
    .then(res => console.log(res))
  }

  render() {
    return (
      <form method="post" action="./index.html" onSubmit={this.handleSubmit}>
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

