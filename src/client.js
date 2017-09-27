import React, { Component } from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './components/Main';

const root = document.getElementById('root');
render(<App />, root);
/*
render( <BrowserRouter>
    <App />
</BrowserRouter>
  , document.getElementById('root'));*/