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
const slugify = (text) =>
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const average = (val, val2) => {
    var result;
    if(val){
        result = (val + val2) / 2;
    }else{
        result = val2;
    }
    return result;
}

class Api extends Component {
    
    constructor(props) {
    super(props);
    console.log(props);
    
       this.state = {
           data: props.data || [],
           hours: getObject(24),
           days: getObject(7),
           months: getObject(12),
           games: {}
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
        var games = this.state.games;
        this.state.data.forEach((val, i) => {
            var game = slugify(val.data.game);
            var date = moment(val.created);
            games[game] = average(games[game], val.data.viewers);
            this.state.hours[date.hour()] = average(this.state.hours[date.hour()], val.data.viewers);
            this.state.months[date.month()] = average(this.state.months[date.month()], val.data.viewers);
            this.state.days[date.day()] = average(this.state.days[date.day()], val.data.viewers);
        })
        this.state.games = games;
        this.setState(this.state);
    }
    
    componentDidMount() {        
        //this.processData();
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
        
        
        var gameSorted = Object.keys(this.state.games).sort((a,b) => {return this.state.games[b]-this.state.games[a]});
        var gameslisted = gameSorted.map((val, i) => {
                return this.state.games[val];
        })
        
        const userData = [
            {
              x: gameSorted.slice(0, 10),
              y: gameslisted.slice(0,10),
              type: 'bar'
            }
        ];

    return (
      <div>
        <h2>Average viewers</h2>
        <h3>Month</h3>
        <PlotlyComponent className="whatever" data={monthData} />
        <h3>Weekday</h3>
        <PlotlyComponent className="whatever" data={weekData} />
        <h3>Hourly</h3>
        <PlotlyComponent className="whatever" data={hourData} />
        <h3>Most viewed games</h3>
        <PlotlyComponent className="whatever" data={userData} />
      </div>
    );
  }
    
}

export default Api;

