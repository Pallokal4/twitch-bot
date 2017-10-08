import React, { Component } from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Application from './index';
import About from './About';
import Users from './Users';
import Header from './Header';
import Pages from './Pages';

import {Grid, Row, Col, Accordion, Panel, NavItem, Nav} from 'react-bootstrap';


const Main = () => (
    <BrowserRouter>
        <Grid>
            <Row>
                <Col sm={3}>
                    <Header />
                </Col>
                <Col sm={9}>
                    <Pages />
                </Col>
            </Row>
        </Grid>
    </BrowserRouter>
);

 export default Main;