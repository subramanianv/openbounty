import React, { Component } from 'react';

// import Dropdown from './Dropdown.js';
import Chart from 'chart.js';

// Dummy Data
const dummyBalance = {
  acctBalance : 175,
  acctHistBalance : [100, 200, 180, 170, 175] ,
};

class UserGraph extends Component {

  componentDidMount(){ 
    const ctx = this.refs.chart.getContext('2d');

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(1, "#ffde55");
    gradientStroke.addColorStop(0, "#b58e12");

    const data = {
      labels: this.props.graphData.labels,
      datasets: [
        {
          pointRadius: 0,
          borderColor:               gradientStroke,
          pointBorderColor:          gradientStroke,
          pointBackgroundColor:      gradientStroke,
          pointHoverBackgroundColor: gradientStroke,
          pointHoverBorderColor:     gradientStroke,
          data: this.props.graphData.datasets[0].data,
        },
      ],
    };


    const options = {
      fill:true, 
      legend:{
        display:false,
      },
      maintainAspectRatio:false,
      responsive:true,
      tooltipFillColor: "rgba(0,0,0,0.8)",
      tooltipFontStyle: "bold",
      datasetStrokeWidth: 3,
           
      tooltips: {
        mode: 'x-axis',
        intersect: false,
      },

      hover: {
        mode: 'nearest',
        intersect: true
      },

      scales: {
        yAxes: [{
            ticks: {
                fontColor: "rgba(0,0,0,0.0)",
                fontStyle: "bold",
                beginAtZero: true,
                maxTicksLimit: 1,
            },
            gridLines: {
                drawTicks: false,
                display: false
            }
          }],
        xAxes: [{ 
          gridLines: {
            zeroLineColor: "transparent",
          }
        }]
      },
      
      showScale:false,
      pointDot:false,
      datasetStroke:false, 
      animation: {
      easing: "easeInOutSine"
      },
    };

    /* eslint new-cap: ["error", {"capIsNewExceptions": ["Line"]}] */
    new Chart(ctx, { type: 'line', data: data, options: options});
  }
  
  render(){
    return (
      <div className='userGraphContainer col-xs-12 row'> 

          <div className="userGraphTitle">
          Overview
          </div>
          <div className="userBalanceTitle">
          <h4> Balance </h4> 
            <div className="userBalanceBox">
              <h2> {dummyBalance.acctBalance} ETH </h2>
            </div>
          </div> 
        
          <div className="chartBox">
          <canvas className="chart" height="290" ref="chart" /> 
          </div>

      </div>
    );
  }
}

export default UserGraph;

