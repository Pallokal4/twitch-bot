import React, { Component } from 'react';
import axios from 'axios';
import Apidata from './chat/Api';



class Api extends Component {
    
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
            this.setState(this.state);
            this.getUserdata();
        }
    }
    
    getUserdata(){
        var user = this.state.user.username || "";
        axios.get('/api/twitch/api/'+user.toLowerCase())
            .then(res => {
              if(res.data){
                  this.state.data = res.data;
                  console.log("res.data", res.data);
                  this.setState(this.state);
              }
            });
    }
    
    componentDidMount() {        
        this.getUserdata();
    }
    
    render() {
        
    return (
      <div>
         <Apidata data={this.state.data} />
      </div>
    );
  }
    
}

export default Api;

