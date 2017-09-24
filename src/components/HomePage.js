import React, { Component } from 'react';

// Importing Images
import logo from '../images/logo.svg';

// import components
import IssueCard from './IssueCard.js';
import UserGraph from './UserGraph.js';
import UserActivity from './UserActivity.js';

//  Is labled as the "ISSUE BOUNTIES" Tab.
// Lists each of the items found in the Dashboard Issues Page.

class HomePage extends Component {

  seeProject() {
    debugger;
  }

  render() {

    return (
      <div className='homePageContainer container'>

        <div className="topBar row logoWrapper col-xs-12">
          <img src={logo} className="appLogo" alt="logo" onClick={()=> this.props.pageChange('LANDING')}/>
        </div>

        <div className="tabContainer row col-xs-12">
          <h4 className="tabIssueBounties col-xs-6 col-sm-4 col-md-2 selectedTab noPadd">
            ISSUE BOUNTIES <span id="glowDotIssue" className="issueSelected"> . </span>
          </h4>
        </div>

        <div className="dashboardContainer row col-xs-12">

          <div className="cardListContainer col-xs-12 col-md-8">
            {this.props.githubInfo.map((Element,i) => <IssueCard key={i}  seeProject={this.seeProject} createTokenBtnHandler={this.props.createTokenBtnHandler} manageRepo={this.props.manageRepo} githubInfo1={Element}/>)}
          </div>

          <div className="userContainer col-xs-12 col-md-4">

              {
                <UserGraph className="col-xs-12" userAddress = {this.props.userAddress} setUserPayoutAddress = {this.props.setUserPayoutAddress}/>

              }


          </div>

        </div>
      </div>

    );
  }
}

export default HomePage;
