import React, { Component } from 'react';
import moment from 'moment';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

const getObject = (j) => {
    var obj = {};
    for(var i = 0; i < j; i++){
        obj[i] = 0;
    }
    return obj;
}

class Chat extends Component {
    
    constructor(props) {
    super(props);
    console.log(props);
    
       this.state = {
           data: props.data || [],
           hours: getObject(24),
           days: getObject(7),
           months: getObject(12),
           users: {}
       }
    }
    
    componentWillReceiveProps(props){
        if(Object.keys(this.state.data).length !== Object.keys(props.data).length){
            this.state.data = props.data;
            this.setState(this.state);
            this.processData();
        }
    }
    
    processData(){
        var users = this.state.users;
        this.state.data.forEach((val, i) => {
            users[val.data.nick] = users[val.data.nick] ? users[val.data.nick] + 1 : 1;
            var date = moment(val.created);
            this.state.hours[date.hour()] += 1;
            this.state.months[date.month()] += 1;
            this.state.days[date.day()] += 1;
        })
        this.state.users = users;
        this.setState(this.state);
    }
    
    componentDidMount() {        
        this.processData();
    }
    
    render() {
        const monthData = [
            {
              x: Object.keys(this.state.months).map(val => {return moment().month(val).format("MMM")} ),
              y: Object.values(this.state.months),
              type: 'bar'
            }
        ];
        
        const weekData = [
            {
              labels: Object.keys(this.state.days).map(val => {return moment().day(val).format("ddd")} ),
              values: Object.values(this.state.days),
              type: 'pie'
            }
        ];
        
        const hourData = [
            {
              x: Object.keys(this.state.hours),
              y: Object.values(this.state.hours),
              type: 'bar'
            }
        ];
        
        
        var userSorted = Object.keys(this.state.users).sort((a,b) => {return this.state.users[b]-this.state.users[a]});
        var userslisted = userSorted.map((val, i) => {
                return this.state.users[val];
        })
        
        const userData = [
            {
              x: userSorted.slice(0, 10),
              y: userslisted.slice(0,10),
              type: 'bar'
            }
        ];

    return (
      <div>
        <h2>Chat activity</h2>
        <h3>Monthly</h3>
        <PlotlyComponent className="whatever" data={monthData} />
        <h3>Weekday</h3>
        <PlotlyComponent className="whatever" data={weekData} />
        <h3>Hourly</h3>
        <PlotlyComponent className="whatever" data={hourData} />
        <h3>Most active users</h3>
        <PlotlyComponent className="whatever" data={userData} />
      </div>
    );
  }
    
}

export default Chat;

