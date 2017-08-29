import React, { Component } from 'react';
import logo from '../images/logo.svg';
import ethLogo from '../images/Ether_Icon.svg';


class RedeemPage2 extends Component {  
  
  // You may or may not want to move the state up to App.js for easier movement of properties. Up to you!
  // Thought it would be more legible to show here what this component needs and if you want to move state up to App.js, you could.
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
      userTokenAmount: "40",

      projEthAddress: "0xFe9891BF9824706b8c7A1141f8D31c7927eba7E2",
      userEthBalance: '175'
      };

  }



  render() {

  var date = new Date();
  var timeStamp = date.toLocaleTimeString();

    return (
      <div className='createPageContainer container'> 

        <div className="topBar row logoWrapper col-xs-12"> 
          <img src={logo} className="appLogo" alt="logo" onClick={()=> this.props.pageChange('LANDING')}/>
        </div>

        <div className="tabContainer row col-xs-12" >
          <h4 className="tabDashboard col-xs-6 col-md-2 faded noPadd" onClick={()=> this.props.pageChange('HOME')} > 
            DASHBOARD > 
          </h4> 
          <h4 className="tabCreateToken col-xs-6 col-md-2 selectedTab noPadd"> 
            REDEEM <span id="glowDotIssue" className="issueSelected"> . </span> 
          </h4> 
        </div>         

        <div className="col-xs-12 container"> 

        
          <div className="stageContainer col-xs-12" >
            <div className="stageTextContainer col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 col-md-2 col-md-offset-5 noPadd"> 
              <div className="col-xs-4"> 1 </div> 
              <div className="col-xs-4"><span className="selectedStage"> 2 </span></div>
              <div className="col-xs-4"> 3 </div>
            </div>
          </div> 

          <div className="createInputBox col-xs-12 container">
            <div className="createContinue text-center col-xs-12 col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4"> 
            
              <h1 className="createInputTitle col-xs-12 noPadd"> YOUR REDEEM REQUEST HAS BEEN SENT </h1> 
              
              <h1 className="createInputSubtitle col-xs-12 faded noPadd"> {this.state.githubInfo.repoName} </h1> 
            
              <h1 className="createInputSubtitle col-xs-12 noPadd"> Redeem request sent at: {timeStamp}  </h1> 

              <h1 className="createInputSubtitle col-xs-12 noPadd"> Your Current Balance </h1>
              
              <div className="balanceBox col-xs-12"> 
            
                <div className="ethBalanceBox col-xs-12 col-sm-5 col-md-3 col-md-offset-2 noPadd">
                  <div className="ethBalanceText col-xs-9 noPadd">
                  {this.state.userEthBalance} ETH 
                  </div> 
                  
                  <div className="ethIcon col-xs-2 noPadd">
                  <img src={ethLogo} className="ethLogo" alt="logo"/> 
                  </div>  
                </div>
                
                <div className="tokenBalanceBox col-xs-12 col-sm-5 col-sm-offset-1 col-md-3 col-md-offset-2  noPadd"> 
                    <div className="tokenBalanceText col-xs-9 noPadd"> 
                    {this.state.userTokenAmount} {this.state.tokenName} 
                    </div> 
                    <div className="tokenIcon col-xs-2 noPadd">
                      <img src={logo} className="obtLogo" alt="logo"/> 
                    </div> 
                </div> 

                </div>
                
              <div className="btnGoldExp createContinueBtn col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4" onClick={()=>{this.props.pageChange('SEE PROJECT');}} >
                <h5> CONTINUE </h5>
              </div>

              </div>


          </div>

        </div>
        </div>
      
    );
  }
}


export default RedeemPage2;