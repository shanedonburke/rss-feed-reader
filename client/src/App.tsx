import React, { Component } from 'react';
import './App.css';

import NewFeedInput from './NewFeedInput'

const logo = require("./logo.svg") as string;



class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch('/api/add-new-feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    
    this.setState({ responseToPost: body });
  };
  
  render() {
    return (
      <NewFeedInput />	
    );
  }
}

export default App;
