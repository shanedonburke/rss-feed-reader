import React from 'react'

export default class LinkNav extends React.Component{
  render() {
    return(
      <div className="topnav">
        <a href="index.html">Your articles</a>
        <a className="active" href="addArticles.html">Add article</a>
        <a href="favorites.html">Favorites</a>
        <a href="account.html">Account</a>
      </div>
    )
  }
}