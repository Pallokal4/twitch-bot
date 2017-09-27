import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
    
    constructor(props) {
    super(props);
       this.state = {
           users: []
       }
       console.log("props", props.match.params.uid);
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
        <h1>user halp.</h1>
        {this.state.users.map((val, i) => {
            return <span>{val.username}</span>
        })}
      </div>
    );
  }
    
}

export default Users;

