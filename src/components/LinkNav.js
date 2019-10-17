import React from 'react'
import Nav from 'react-bootstrap/Nav'


export default class LinkNav extends React.Component{
  render() {
    return(
      <Nav variant="pills" defaultActiveKey="/home" fill>
      <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Favorite</Nav.Link>
      </Nav.Item>
      <Nav.Item>
      < Nav.Link eventKey="link-2">Profile</Nav.Link>
      </Nav.Item>
    </Nav>
    )
  }
}