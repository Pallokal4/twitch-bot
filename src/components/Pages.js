import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './About';
import Page2 from './Users';

export default () =>
    <div>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Page2} />
        <Route path="/user/:uid" component={Page2} />
    </div>;