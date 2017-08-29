import React, { Component } from 'react';
import logo from '../images/logo.svg';
// import logoText from '../images/logoText.png';

// import components
// import IssueCard from './IssueCard.js'; 


class RedeemPage extends Component {

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
      projectName: '',
      tokenName: '',
      ethAmount: '',
      totalSupply: '',
      userTokenAmount: "40",
      redeemRequestAmount: '',


      projEthAddress: "0xFe9891BF9824706b8c7A1141f8D31c7927eba7E2",
      userEthBalance: '175'
      };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleManualSubmit = this.handleManualSubmit.bind(this);
    this.checkContent = this.checkContent.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  checkContent(){
    // Not sure what kind of checks you want to do here, so basic 'not empty' stuff here for now.
      if ((document.getElementById("redeemRequestAmount").value === "") || (this.state.redeemRequestAmount > this.state.userTokenAmount)){
        // Missing data 
        alert('Error');
        return false;
    }

    else this.props.pageChange('REDEEM_2'); 
  }

  handleManualSubmit(){
    console.log(
      "ProjectName: " + this.state.projectName +
      "\nRedeemAmount: " + this.state.redeemRequestAmount +
      "\nOwnedTokens: " + this.state.userTokenAmount
    );
  }

  render() {


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
        <div className="col-xs-12">
        
          <div className="stageContainer col-xs-12" >
            <div className="stageTextContainer col-xs-10 col-xs-offset-1 col-sm-4 col-sm-offset-4 col-md-2 col-md-offset-5"> 
              <div className="col-xs-4"><span className="selectedStage"> 1 </span></div>
              <div className="col-xs-4"> 2 </div> 
              <div className="col-xs-4"> 3 </div>
            </div>
          </div> 

          <div className="createInputBox col-xs-12 container">
            <div className="createInputForm col-xs-12 col-sm-6 col-md-4 col-sm-offset-1"> 
            
              <h1 className="createInputTitle col-xs-12 noPadd"> PROJECT </h1> 
                <input required type="text" id="projectName" className="form-control formEdit" name="projectName" value={this.state.githubInfo.repoName} onChange={this.handleInputChange}/>

              <h1 className="createInputTitle col-xs-12 noPadd"> Total Owned Tokens </h1> 
                <input required type="text" id="userTokenAmount" className="form-control formEdit" name="userTokenAmount" value={this.state.userTokenAmount} onChange={this.handleInputChange} />

              <h1 className="createInputTitle col-xs-12 noPadd"> Amount to Redeem </h1> 
                <input required type="text" maxLength="5" id="redeemRequestAmount" className="form-control formEdit" name="redeemRequestAmount" placeholder="Value will be divided among tokens" value={this.state.redeemRequestAmount} onChange={this.handleInputChange} />

              <div className="btnGold createTokenBtn col-xs-12" onClick={()=>{this.handleManualSubmit(); this.checkContent();}} >
                <h5> CREATE </h5>
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



export default RedeemPage;