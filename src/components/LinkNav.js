import React from 'react';
import { Link } from 'react-router-dom';

export default class LinkNav extends React.Component{
  render() {
    return(
      <div className="topnav">
        <Link to="/">Your articles</Link>
        <Link to="/add-article">Add article</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/account">Account</Link>
      </div>
    )
  }
}