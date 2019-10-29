<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
=======
import React from 'react'
import Nav from 'react-bootstrap/Nav'

>>>>>>> 7e95321f11e80e65f4beb5a9c9c7475c992caf90

export default class LinkNav extends React.Component{
  render() {
    return(
<<<<<<< HEAD
      <div className="topnav">
        <Link to="/">Your articles</Link>
        <Link to="/add-article">Add article</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/account">Account</Link>
      </div>
=======
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
>>>>>>> 7e95321f11e80e65f4beb5a9c9c7475c992caf90
    )
  }
}