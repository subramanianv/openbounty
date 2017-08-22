import React, { Component } from 'react';
import logo from '../images/logo.svg';
import logoText from '../images/logoText.png';

// import components
import IssueCard from './IssueCard.js'; 
import UserGraph from './UserGraph.js';
import UserActivity from './UserActivity.js';

class HomePage extends Component {
  render() {

    return (
      <div className='homePageContainer container'> 

        <div className="topBar logoWrapper"> 
          <img src={logo} className="appLogo" alt="logo" onClick={()=> this.props.pageChange('LANDING')}/>
          <img id="slide" src={logoText} alt="logoText" /> 
        </div>

        <div className="tabContainer row col-xs-12">
          <h4 className="tabIssueBounties col-xs-12 col-md-2 selectedTab"> 
            ISSUE BOUNTIES
          </h4> 
          <h4 className="tabClaimBounties col-xs-12 col-md-2"> 
            CLAIM BOUNTIES
          </h4> 
        </div>       

        <div className="dashboardContainer row col-xs-12"> 

          <div className="cardListContainer col-xs-12 col-md-8 ">
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


            // <h4 className="tabOpenBounties col-xs-12 col-md-2"> 
            //   OPEN BOUNTIES
            // </h4> 



export default HomePage;