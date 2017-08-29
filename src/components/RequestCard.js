import React, { Component } from 'react';


// Each card in the "Manage" tab is an RequestCard. This component takes the mapped information from the incoming App.js state and spits it out in the correct format.

class RequestCard extends Component {
  render() {

    return (

      <div className="requestCardContainer col-xs-12 noPadd">

        <div className="dividerLine"/>
        <div className="requestContentContainer col-xs-12 noPadd">

        <div className="leftRequestContainer col-xs-5 noPadd">
          <div className="userNameBox col-xs-12 noPadd"> {this.props.requestList1.userName} </div> 
          <div className="timeSentBox col-xs-12 noPadd"> {this.props.requestList1.timeSent} </div>
        </div> 


        <div className="rightRequestContainer col-xs-7 noPadd"> 
          <div className="tokenAmountBox col-xs-4"> {this.props.requestList1.tokenAmount} {this.props.requestList1.tokenName} </div>
          <div className="equalSeparator col-xs-4"> =  </div> 
          <div className="etherAmountBox col-xs-4"> {this.props.requestList1.etherAmount} ETH</div> 
        </div> 
            





        </div>
      </div> 
    );
  }
}

export default RequestCard;
