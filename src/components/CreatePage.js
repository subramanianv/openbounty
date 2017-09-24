import React, { Component } from 'react';
import logo from '../images/logo.svg';


class CreatePage extends Component {


  // You may or may not want to move the state up to App.js for easier movement of properties. Up to you!
  // Thought it would be more legible to show here what this component needs and if you want to move state up to App.js, you could.
  // Use the data passed in by App.js in githubInfo the way you'd like. For now, dummy data:

  constructor(props) {
    super(props);
    this.state = {
      githubInfo: props.repo,
      projectName: props.repo.repoName,
      tokenName: '',
      ethAmount: '',
      totalSupply: '',
      tokenSymbol : '',
      tokenName : props.repo.repoName
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
      if ((document.getElementById("tokenSymbol").value === "") || (document.getElementById("totalSupply").value === ""))
    {
        // Missing data
        alert('Missing data on input field');
        return false;
    }

    else {
      const token = Object.assign({}, this.state.githubInfo, {
        ethAmount : this.state.ethAmount,
        totalSupply : this.state.totalSupply,
        tokenName : this.state.tokenName,
        tokenSymbol : this.state.tokenSymbol
      });
      this.props.createNewTokenContract(token)
    }
  }

  handleManualSubmit(){



    console.log(
      "ProjectName: " + this.state.projectName +
      "\nTokenName: " + this.state.tokenName +
      "\nETH Amount: " + this.state.ethAmount +
      "\nTotal Supply: " + this.state.totalSupply
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
            CREATE <span id="glowDotIssue" className="issueSelected"> . </span>
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

              <h1 className="createInputTitle col-xs-12 noPadd"> TOKEN NAME </h1>
                <input required type="text" id="tokenName" className="form-control formEdit" name="tokenName" value={this.state.githubInfo.repoName} onChange={this.handleInputChange}/>

              <h1 className="createInputTitle col-xs-12 noPadd"> TOKEN SYMBOL </h1>
                <input required type="text" maxLength="3" id="tokenSymbol" className="form-control formEdit" name="tokenSymbol" placeholder="A three-letter token ticker" value={this.state.tokenSymbol} onChange={this.handleInputChange} />

              <h1 className="createInputTitle col-xs-12 noPadd"> TOTAL SUPPLY </h1>
                <input required type="text" maxLength="5" id="totalSupply" className="form-control formEdit" name="totalSupply" placeholder="Number of tokens to create" value={this.state.totalSupply} onChange={this.handleInputChange} />

              <div className="btnSilver createTokenBtn col-xs-12" onClick={()=>{this.handleManualSubmit(); this.checkContent();}} >
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

export default CreatePage;
