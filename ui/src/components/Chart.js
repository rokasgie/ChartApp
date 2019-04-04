import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  render(){
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title:{
              display: true,
              text:'Correction Statistics',
              fontSize:25
            },
            legend:{
              display: true,
              position: 'bottom'
            },
            scales: {
              yAxes: [{
                  ticks: {
                      max: 100,
                      beginAtZero: true,
                  }
              }]
          }}}
        />
      </div>
    )
  }
}

export default Chart;