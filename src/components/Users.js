import React, { Component } from 'react';
import axios from 'axios';
import Chat from './Chatactivity';

class Users extends Component {
    
    constructor(props) {
    super(props);
       this.state = {
           user: {},
           username: props.match.params.uid || ""
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
    
    render() {
    return (
      <div>
        <h1>{this.state.username}</h1>
        <Chat user={this.state.user} />
      </div>
    );
  }
    
}

export default Users;

