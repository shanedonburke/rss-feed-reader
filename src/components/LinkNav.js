import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

/**
 * The navbar component
 */
export default class LinkNav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      path: "" // Current window location
    }
  }

  /**
   * Set current window location as state
   */
  componentDidMount(){
    this.setState({path: document.location.pathname})
  }

  /**
   * Render navbar with active page's button highlighted
   */
  render() {
    return (
      <Nav variant="pills" className="topnav" activeKey={this.state.path} fill>
        <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/addArticles">Add Feeds</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/my-feeds">My Feeds</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
