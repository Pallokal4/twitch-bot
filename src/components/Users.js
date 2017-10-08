import React, { Component } from 'react';
import axios from 'axios';
import Chat from './Chatactivity';
import Api from './Api'
import MonthApi from './MonthApi'
import {Grid, Row, Col, Accordion, Panel, NavItem, Nav} from 'react-bootstrap';

class Users extends Component {
    
    constructor(props) {
    super(props);
       this.state = {
           user: {},
           username: props.match.params.uid || "",
           panel: "api"
       }
    }
    
    componentWillReceiveProps(props){
        if(this.state.username !== props.match.params.uid){
            this.state.username = props.match.params.uid;
            this.setState(this.state);
            console.log("getUserData2");
            this.getUserData();
           
        }
    }
    
    getUserData(){
        console.log("getUserData", this.state.username);
        axios.get('/api/users/getUser/'+this.state.username)
            .then((res) => {
              if(res.data){
                  this.state.user = res.data[0];
                  this.setState(this.state);
              }
            }, (fail) => {
                   this.state.user = {};
                   this.setState(this.state);
            });
    }
    
    componentDidMount() {        
        this.getUserData();
    }
    
    setSelected(e){
        this.state.panel = e;
        this.setState(this.state);
    }
    
    
    render() {
    return (
      <div>
            <Row className="show-grid">
                <h1>{this.state.username}</h1>
            </Row>
            <Row className="show-grid">
                <Col xs={12} md={12}>
                <div>
                    <MonthApi user={this.state.user} />
                </div>
                <Nav bsStyle="tabs" justified activeKey={this.state.panel} onSelect={(e) => this.setSelected(e)}>
                    <NavItem eventKey={1} >Chattitiedot</NavItem>
                    <NavItem eventKey={2} >Katsojatiedot</NavItem>
                  </Nav>

                    <div style={{display: this.state.panel == 2 ? "block" : "none"}}>
                        <Api user={this.state.user} />
                    </div>
                    <div style={{display: this.state.panel == 1 ? "block" : "none"}} >
                        <Chat user={this.state.user} />
                    </div>

                </Col>
            </Row>
      </div>
    );
  }
    
}

export default Users;

