import React, { Component } from 'react';
import logo from '../images/logo.svg';
import ethLogo from '../images/Ether_Icon.svg';

// import components
import RequestCard from './RequestCard.js';

class CreatePage extends Component {
  // Use the data passed in by App.js in githubInfo the way you'd like. For now, dummy data: 
  constructor(props) {
    super(props);
    this.state = {
      githubInfo: 
        {
          repoName : "openbounty_development",
          repoUserName : "SPTechnology",
          repoDisc : "Scaffolding for openbounty project, looking for devs to contribute! Tokens available.",
          repoTech : ['JavaScript ', 'HTML ', 'CSS '], 
          repoLastUpdate : "2 Days Ago", 
          repoActiveStatus : false,
        },
      projectName: 'openbounty_development',
      tokenName: 'OBT',
      ethAmount: '25',
      totalSupply: '500',

      projEthAddress: "0xFe9891BF9824706b8c7A1141f8D31c7927eba7E2",
      userEthBalance: '175',
      projectUnlocked: true, 
      };
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
            PROJECT<span id="glowDotIssue" className="issueSelected"> . </span> 
          </h4> 
        </div>         

        <div className="col-xs-12 container"> 

          <div className="manageProjectContainer col-xs-12 col-md-6"> 
            <div className="manageProjectMain col-xs-12"> 
              <div className="manageProjectMainContents col-xs-12 noPadd" > 

                <h2 className="manageProjectTitle"> Project </h2> 
                  <h1 className="manageProjectName col-xs-12 noPadd"> {this.state.githubInfo.repoName} </h1> 

                <h1 className="manageSubtitle col-xs-12 noPadd"> Address </h1>                       
                  <div className="manageEthAddressBox col-xs-10 col-sm-9 col-md-10"> 
                    <p className="ethAddressText"> 
                    {this.state.projEthAddress}
                    </p> 
                  </div>  

                <h1 className="manageSubtitle col-xs-12 noPadd"> Balance </h1>                          
                  <div className="balanceBox col-xs-12 noPadd"> 
                
                  <div className="manageEthBalanceBox col-xs-10 col-sm-4 col-md-3 noPadd">
                    <div className="ethBalanceText col-xs-9 noPadd">
                      {this.state.userEthBalance} ETH 
                    </div> 
                    
                    <div className="ethIcon col-xs-2 noPadd">
                      <img src={ethLogo} className="ethLogo" alt="logo"/> 
                    </div>  
                  </div>
                    
                  <div className="manageTokenBalanceBox col-xs-10 col-sm-4 col-sm-offset-1 col-md-3 noPadd"> 
                    <div className="tokenBalanceText col-xs-9 noPadd"> 
                      {this.state.totalSupply} {this.state.tokenName} 
                    </div> 
                    <div className="tokenIcon col-xs-2 noPadd">
                      <img src={logo} className="obtLogo" alt="logo"/> 
                    </div>                       
                  </div> 


                </div>
              </div> 
            </div>
          </div>

 
            <div className="redeemRequestContainer col-xs-12 col-md-6">
              <div className="manageProjectListContents col-xs-12 noPadd">
                  <h2 className="manageProjectTitle"> Redeem Token Requests </h2> 
              </div>

              <div className="cardRequestContainer col-xs-12">

                <div className="cardListTitles col-xs-12 noPadd"> 
                <span className="userRedeemTitle col-xs-5"> User </span> <span className="amountRedeemTitle col-xs-7"> Amount </span>
                </div>

                <div className="cardListContent col-xs-12 noPadd"> 
                  {this.props.requestList.map((Element,i) => <RequestCard key={i} requestList1={Element}/>)}
                </div>

            </div>
          </div> 

      </div>
    </div>
    );
  }
}


export default CreatePage;