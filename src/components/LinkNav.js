import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default class LinkNav extends React.Component {
  render() {
    return (
      <Nav variant="pills" defaultActiveKey="/home" fill>
        <Nav.Item>
          {/* <Link to="/"> */}
            <Nav.Link href="/home">Active</Nav.Link>
          {/* </Link> */}
        </Nav.Item>
        <Nav.Item>
          {/* <Link to="/favorites"> */}
            <Nav.Link eventKey="link-1">Favorite</Nav.Link>
          {/* </Link> */}
        </Nav.Item>
        <Nav.Item>
          {/* <Link to="/profile"> */}
            <Nav.Link eventKey="link-2">Profile</Nav.Link>
          {/* </Link> */}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/my-feeds">My Feeds</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
