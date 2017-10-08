import React, { Component } from 'react';
import axios from 'axios';
import Chat from './chat/Chat';

const getObject = (j) => {
    var obj = {};
    for(var i = 0; i < j; i++){
        obj[i] = 0;
    }
    return obj;
}

class Chatactivity extends Component {
    
    constructor(props) {
    super(props);
    console.log(props);
       this.state = {
           user: props.user,
           data: []
       }
    }
    
    componentWillReceiveProps(props){
        if(this.state.user.username !== props.user.username){
            this.state.user = props.user;
            this.state.data = [];
            this.setState(this.state);
            this.getUserdata();
        }
    }
    
    getUserdata(){
        var user = this.state.user.username || "";
        axios.get('/api/twitch/chat/'+user.toLowerCase())
            .then(res => {
              if(res.data){
                  this.state.data = res.data;
              }else {
                  this.state.data = [];
              }
              this.setState(this.state);
            });
    }
    
    componentDidMount() {        
        this.getUserdata();
    }
    
    render() {
        
    return (
      <div>
         <Chat data={this.state.data} user={this.state.user.username} />
      </div>
    );
  }
    
}

export default Chatactivity;

