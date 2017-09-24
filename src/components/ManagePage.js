import React, { Component } from 'react';
import logo from '../images/logo.svg';
import ethLogo from '../images/Ether_Icon.svg';
import _ from 'underscore';


import PullRequestCard from './PullRequestCard'


class ManagePage extends Component {



  // Use the data passed in by App.js in githubInfo the way you'd like. For now, dummy data:
  constructor(props) {

    super(props);
    // this.state.PRs = [1,2,3,4,5];
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {

    return (
      <div className='managePageContainer container'>

        <div className="topBar row logoWrapper col-xs-12">
          <img src={logo} className="appLogo" alt="logo" onClick={()=> this.props.pageChange('LANDING')}/>
        </div>

        <div className="tabContainer row col-xs-12" >
          <h4 className="tabDashboard col-xs-6 col-md-2 faded noPadd" onClick={()=> this.props.pageChange('HOME')} >
            DASHBOARD >
          </h4>
          <h4 className="tabCreateToken col-xs-6 col-md-2 selectedTab noPadd">
            MANAGE<span id="glowDotIssue" className="issueSelected"> . </span>
          </h4>
        </div>

        <div className="col-xs-12 container">
        <div style={{backgroundColor: "transparent"}} className="redeemRequestContainer col-xs-12 col-md-6">
          <div style= {{top : 0}} className="manageProjectListContents col-xs-12 noPadd">
              <h1 className="manageProjectTitle"> Pull Requests </h1>
          </div>



          <div style={{top : 1}} className="cardRequestContainer col-xs-12">
          {
            this.props.PRs && this.props.PRs.length > 0 ? this.props.PRs.map((_PR) => {
              return <PullRequestCard repo = {this.props.repo} PR= {_PR} onButtonClick = {this.props.onButtonClick}/>
            }): null
          }

        </div>
      </div>


          <div className="manageProjectContainer col-xs-12 col-md-6">
            <div className="manageProjectMain col-xs-12">
              <div className="manageProjectMainContents col-xs-12 noPadd" >

                <h2 className="manageProjectTitle"> Project </h2>
                  <h1 className="manageProjectName col-xs-12 noPadd"> {this.props.repo.name} - {this.props.repo.tokenSymbol.toUpperCase()} </h1>

                <h1 className="manageSubtitle col-xs-12 noPadd"> Token Address </h1>
                  <div className="manageEthAddressBox col-xs-10 col-sm-9 col-md-10">
                    <p className="ethAddressText">
                    {this.props.repo.tokenAddress}
                    </p>
                  </div>

                <h1 className="manageSubtitle col-xs-12 noPadd"> Tokens Available for  Bounties : &nbsp; {this.props.repo.allowance} {this.props.repo.tokenSymbol.toUpperCase()}</h1>
                  <div className="balanceBox col-xs-12 noPadd">
                  <div style={{marginLeft : 16}} className="btnGoldExp manageEthBalanceBox col-xs-10 col-sm-4 col-md-5" onClick={_.partial(this.props.addTokens, this.props.repo)} >
                    &nbsp;&nbsp;<span> Add more tokens for Bounty </span>
                  </div>
                </div>
              </div>
            </div>
          </div>





      </div>
    </div>
    );
  }
}


            // <h4 className="tabOpenBounties col-xs-12 col-md-2">
            //   OPEN BOUNTIES
            // </h4>



export default ManagePage;
