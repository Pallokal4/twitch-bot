import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

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
        <h1>Käyttäjät</h1>
        <ul>
            {this.state.users.map((val, i) => {
                return <li><Link to={'/user/'+val.username}>{val.username}</Link></li>
            })}
        </ul>
      </div>
    );
  }
    
}

export default Header;

