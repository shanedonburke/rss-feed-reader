import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default class LinkNav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      path: ""
    }
  }
  componentDidMount(){
    this.setState({path: document.location.pathname})
  }
  render() {
    return (
      <Nav variant="pills" className="topnav" activeKey={this.state.path} fill>
        <Nav.Item>
          {/* <Link to="/"> */}
            <Nav.Link href="/">Home</Nav.Link>
          {/* </Link> */}
        </Nav.Item>
        <Nav.Item>
          {/* <Link to="/favorites"> */}
            <Nav.Link href="/addArticles">Add Feeds</Nav.Link>
          {/* </Link> */}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/my-feeds">My Feeds</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
