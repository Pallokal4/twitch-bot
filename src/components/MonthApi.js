import React, { Component } from 'react';
import axios from 'axios';
import Apidata from './chat/Api';
import moment from 'moment';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

const getDates = (startDate, stopDate) => {
      var dates = {};
      var currentDate = moment(startDate);
      while (currentDate <= moment(stopDate)) {
        dates[currentDate.format('DD-MM-YYYY')] = 0;
        currentDate = currentDate.add(1, 'd');
      }
      return dates;
}

class MonthApi extends Component {
    
    constructor(props) {
    super(props);
    console.log(props);
       this.state = {
           user: props.user,
           data: [],
           streamDays: getDates(moment().subtract(1, 'M').format(), moment().format())
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
        axios.get('/api/twitch/api/'+user.toLowerCase()+'/month')
            .then(res => {
              if(res.data){
                  this.state.data = res.data;
                  console.log("res.data", res.data);
                  this.setState(this.state, () => this.processData());
              }
            });
    }
    
    processData(){
        this.state.data.forEach((val, i) => {
            var date = moment(val.created);
            this.state.streamDays[date.format('DD-MM-YYYY')] += 1;
        })
        this.setState(this.state);
    }
    
    componentDidMount() {        
        this.getUserdata();
    }
    
    render() {
        
        const monthData = [
            {
              x: Object.keys(this.state.streamDays),
              y: Object.values(this.state.streamDays),
              type: 'bar'
            }
        ];
        
    return (
      <div>
         <h3>Stream activity minutes</h3>
         <PlotlyComponent className="whatever" data={monthData} />
      </div>
    );
  }
    
}

export default MonthApi;

