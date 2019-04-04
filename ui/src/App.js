import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';

class App extends Component {
  
  static API_URL = 'http://localhost:8080/data.json';

  constructor(){
    super();
    this.state = {
      chartData:{},
      data: null,
      isLoading: false,
      error: null,
    }
  }

  componentWillMount(){
    this.getChartData();
  }

  getChartData(){
    this.setState({ isLoading: true});

    fetch(App.API_URL)
    .then(response => {return response.json();})
    .then(json => {   
      this.setState({
        isLoading: false,
        chartData:{
          labels: json["labels"],
          datasets:[
            {
              label:'Corrected',
              borderColor: 'rgba(0, 0, 204, 0.8)',
              data: json["correctedData"],
              backgroundColor:[
                'rgba(0, 0, 204, 0.2)',
              ]
            },
            {
              label:'Uncorrected',
              borderColor: 'rgba(0, 128, 255, 0.8)',
              data: json["uncorrectedData"],
              backgroundColor:[
                'rgba(0, 128, 255, 0.2)',
              ]
            },
            {
              label:'Name mismatch',
              borderColor: 'rgba(0, 255, 0, 0.8)',
              data: json["mismatchedData"],
              backgroundColor:[
                'rgba(0, 255, 0, 0.2)',
              ]
            }
          ]
        }
      });
    });
  }

  render() {
    if(!this.state.isLoading)
    return (
      <div className="App">
        <Chart chartData={this.state.chartData}/>
      </div>
    );
    else return (<div>Loading...</div>);
  }
}

export default App;
