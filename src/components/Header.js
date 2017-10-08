import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {Grid, Row, Col, Accordion, Panel, NavItem, Nav} from 'react-bootstrap';

class Header extends Component {
    
    constructor(props) {
    super(props);
       this.state = {
           users: []
       }

    }
    
    componentDidMount() {        
        axios.get('/api/users/getUsers')
            .then(res => {
              if(res.data){
                  this.state.users = res.data.map((val, i) => {
                      return val;
                  })
                  this.setState(this.state);
              }
            });
    }
    
    render() {
    return (
      <div>
        <h2>Käyttäjät</h2>
        <Nav bsStyle="pills" stacked>
            {this.state.users.map((val, i) => {
                return <NavItem><Link to={'/user/'+val.username}>{val.username}</Link></NavItem>
            })}
        </Nav>
      </div>
    );
  }
    
}

export default Header;

