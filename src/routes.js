import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom' ;
import App from './App';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ App } />
      <Route path="/add-article" component={ App } />
      <Route path="/favorites" component={ App } />
      <Route exact path="/account" component={ App } />
      <Route path="/my-feeds" component = { App } />
    </Switch>
  </BrowserRouter>
);

export default Routes;