import React, { Component } from 'react';
import Chart from 'chart.js';

// Dummy Data. You're going to need to pull this from the BlockChain.

const dummyBalance = {
  acctBalance : 175,
  acctHistBalance : [100, 200, 180, 170, 175] ,
};

class UserGraph extends Component {

  componentDidMount() {

  }

  render(){
    return (
      <div className='userGraphContainer col-xs-12 container' style={{paddingLeft:20, paddingTop:20}}>
          <h4>
              {
                (this.props.userAddress == null) ? "New ? You haven't set the token address" : "Your token payout address is " + this.props.userAddress
              }
          </h4>
          <br/>
          <div className="btnGold" onClick={this.props.setUserPayoutAddress}>
              <h5>Set Address</h5>
          </div>

      </div>

    );
  }
}

export default UserGraph;
