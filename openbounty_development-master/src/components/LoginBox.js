import React, { Component } from 'react';

// Importing Tools
import jump from 'jump.js';

// Importing Image for Octicon
import MarkSVG from "../images/mark-github.svg";


class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleManualSubmit = this.handleManualSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleManualSubmit(){
    console.log("User: " + this.state.userName + "\nPassword: " + this.state.password)

  }

  render() {

    return (
    <div id="loginIDTag" className="loginBoxContainer col-xs-10 col-xs-offset-1 row"> 
  
      <div className="loginTitleContainer col-xs-10 col-xs-offset-1 noPadd">
        <h1 className="loginTitle"> Sign in to <strong> Github </strong> to continue to <strong> OpenBounty </strong> </h1>
      </div>

      <div className="userNamePrompt col-xs-10 col-xs-offset-1 noPadd"> 
        <h2 className="userNamePromptText"> USERNAME / EMAIL ADDRESS </h2> 
      </div>

      <div className="input-group input-group-lg col-xs-10 col-xs-offset-1">
       <input type="text" className="form-control formEdit" name="userName" value={this.state.userName} onChange={this.handleInputChange} />
      </div>

      <div className="passwordPrompt col-xs-10 col-xs-offset-1 noPadd"> 
        <h2 className="passwordPromptText"> PASSWORD </h2> 
      </div>

 
      <div className="input-group input-group-lg col-xs-10 col-xs-offset-1">
       <input type="text" className="form-control formEdit" name="password" value={this.state.password} onChange={this.handleInputChange} />
      </div>

      <div className="btnLogin row col-xs-4 col-xs-offset-1 " onClick={()=>{this.handleManualSubmit(); this.props.pageChange('HOME'); jump('.topBar');}} > LOGIN
      </div>

      <div className="loginBoxFooterText col-xs-10 col-xs-offset-1 noPadd">
       <p className="btn noPadd" onClick={()=>{window.open("https://github.com/join")}} > New to Github? Create an Account. </p>
      </div> 

      <div className="githubImage btn noPadd">
        <img onClick={()=>{window.open("https://github.com")}} src={MarkSVG}/> 
      </div>



    </div>   
    );
  }
}


export default LoginBox;