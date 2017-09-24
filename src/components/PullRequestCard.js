import React, { Component } from 'react';
import BtnIssueCard from './BtnIssueCard';
import _ from 'underscore'

// Each card in the "IssueBounty" tab is an IssueCard. This component takes the mapped information from GitHub and spits it out in the correct format.

class PullRequestCard extends Component {

  render() {
    let PR_STATE = {
      1 : "OPEN",
      2: "CLOSED",
      3 : "MERGED",
      4 : "AWAITING_ADDRESS",
      5 : "FULFILLED"
    }
    let BTN_MESSAGES = {
      1 : "SET BOUNTY",
      3 : "ACCEPT AND SEND BOUNTY"
    }
    console.log("Rendering");
    // Set Default Color as White (in case no Tech Match)
    let foundTechColor = "#FFF"

    // Pull data in from Colors.Json to compare to incoming GitHub information
    let data = require('../colors.json');

    // removes the space at the end of the incoming data to properly work with the FindTechColor function below.
    let repoTech = "javascript"


    // Find Color in colors.json that matches incoming github data from Props. Take the corresponding color - set to a variable, and put it into the SVG in the render.
    var findTechColor = function(obj){
      var colorList = [];
      for(let key in data[0]){
          colorList.push(key);
      }

      function compareTech() {   for (let i=0; i < colorList.length; i++){
          if (repoTech === colorList[i]){
          let techName = colorList[i];
          foundTechColor = data[0][techName].color;
          return
          }
        }
      }
      compareTech();
    }

    findTechColor();
    return (

        <div className="cardContainer col-xs-12">
          <div className="cardContentContainer col-xs-12 noPadd">

            <div className="leftSide col-xs-12 col-sm-8 noPadd">

              <div className="repoNameContainer col-xs-12">
                <p className="repoName">
                {this.props.PR.title}
                </p>
              </div>
              <div className="repoNameContainer col-xs-12">
                <p className="repoName">
                Bounty : {this.props.PR.numTokens + " " + this.props.repo.tokenSymbol}
                </p>
              </div>
              <div className="repoNameContainer col-xs-12">
                <p className="repoName">
                {"Contributed by " + this.props.PR.username}
                </p>
              </div>
              { this.props.PR.state!=PR_STATE.OPEN && this.props.PR.address == null ? <span>Waiting for contributer to signup</span>:
                (<div  onClick = {_.partial(this.props.onButtonClick, BTN_MESSAGES[this.props.PR.state], this.props.PR, this.props.repo)} className="btnGoldExp col-xs-7">
                  <span>{BTN_MESSAGES[this.props.PR.state]}</span>
               </div>)
              }


            </div>

            <div className="rightSide col-xs-12 col-sm-4 noPadd">
              <p style={{color : "#b58e12"}} className="repoName"><b>{
                PR_STATE[this.props.PR.state]
              }</b></p>
            </div>

        </div>
      </div>

    );
  }
}

export default PullRequestCard;

// for Maping incoming data to repos (takes array called IssueBountiesRepos)
// {this.state.IssueBountiesRepos.map((Element,i) => <IssueBountiesCard key={i} Repos={Element}/>)}
