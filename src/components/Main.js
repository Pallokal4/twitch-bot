import React, { Component } from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Application from './index';
import About from './About';
import Users from './Users';
import Header from './Header';
import Pages from './Pages';


const Main = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Pages />
        </div>
    </BrowserRouter>
);

 export default Main;