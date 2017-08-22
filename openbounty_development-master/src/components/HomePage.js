import React, { Component } from 'react';

// Importing Images
import logo from '../images/logo.svg';

// import components
import IssueCard from './IssueCard.js'; 
import UserGraph from './UserGraph.js';
import UserActivity from './UserActivity.js';


class CreatePage extends Component {
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

          <h4 className="tabClaimBounties col-xs-6 col-sm-4 col-md-2 noPadd"  onClick={()=> this.props.pageChange('CLAIM')}> 
            CLAIM BOUNTIES
          </h4> 
        </div>       

        <div className="dashboardContainer row col-xs-12"> 

          <div className="cardListContainer col-xs-12 col-md-8">
            {this.props.githubInfo.map((Element,i) => <IssueCard key={i} githubInfo={Element}/>)}
          </div> 
                      
          <div className="userContainer col-xs-12 col-md-4">
            <UserGraph className="col-xs-12" graphData={this.props.graphData} />
            <UserActivity className="col-xs-12" githubUser={this.props.githubUser} />
          </div> 

        </div>
      </div>

    );
  }
}

export default CreatePage;