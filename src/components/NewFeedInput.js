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
    event.preventDefault();
    
    const data = {
        feedURL: this.state.value
    }
    

    fetch('/add-feed', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
     }).then((response) => {
       response.text().then(
         result => {
           alert(result);
         }
       );
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

