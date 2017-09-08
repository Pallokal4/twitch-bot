import React, { Component } from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Application from './components';
import About from './components/About';


render( <BrowserRouter>
    <Switch>
        <Route path='/about' component={About}/>
        <Route path='/' component={Application}/>
    </Switch>
</BrowserRouter>
  , document.getElementById('root'));