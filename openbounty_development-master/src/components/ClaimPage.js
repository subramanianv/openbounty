import React, { Component } from 'react';
import logo from '../images/logo.svg';

// import components
import ClaimCard from './ClaimCard.js'; 
import UserGraph from './UserGraph.js';
import UserActivity from './UserActivity.js';

class ClaimPage extends Component {
  render() {

    return (
      <div className='homePageContainer container'> 

        <div className="topBar row logoWrapper col-xs-12"> 
          <img src={logo} className="appLogo" alt="logo" onClick={()=> this.props.pageChange('LANDING')}/>
        </div>

        <div className="tabContainer row col-xs-12">
          <h4 className="tabIssueBounties col-xs-6 col-sm-4 col-md-2 noPadd" onClick={()=> this.props.pageChange('HOME')}> 
            ISSUE BOUNTIES
          </h4> 
          <h4 className="tabClaimBounties col-xs-6 col-sm-3 col-md-2 selectedTab noPadd"> 
            CLAIM BOUNTIES <span id="glowDotClaim" className="claimSelected"> . </span> 
          </h4> 
        </div>       

        <div className="dashboardContainer row col-xs-12"> 

          <div className="cardListContainer col-xs-12 col-md-8">
            {this.props.githubClaimInfo.map((Element,i) => <ClaimCard key={i} githubClaimInfo={Element}/>)}
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





export default ClaimPage;