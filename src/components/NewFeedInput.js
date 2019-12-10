import React from 'react'

/**
 * Text input for adding a new feed URL
 */
class NewFeedInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}; // Textbox value

    this.handleChange = this.handleChange.bind(this); // Textbox change
    this.handleSubmit = this.handleSubmit.bind(this); // Submit button
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const data = {
        feedURL: this.state.value
    }
    
    // Add feed to list
    fetch('/add-feed', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
     }).then((response, err) => {
       if (!err) {
         alert("New feed added successfully!");
       }
     });

  }

  /**
   * Render text input and submit button
   */
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
