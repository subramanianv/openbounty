import React, { Component } from 'react';

// Each card in the "IssueBounty" tab is an IssueCard. This component takes the mapped information from GitHub and spits it out in the correct format.
class IssueCard extends Component {
  render() {

// Set Default Color as White (in case no Tech Match)
let foundTechColor = "#FFF"

// Pull data in from Colors.Json to compare to incoming GitHub information
let data = require('../colors.json');

// removes the space at the end of the incoming data to properly work with the FindTechColor function below.
let repoTech = this.props.githubInfo.repoTech[0].replace(/\s/g,'');


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

        <div className="cardContainer col-xs-12 row"> 
          <div className="cardContentContainer col-xs-12 row"> 
            
            <div className="leftSide col-xs-12 col-sm-9 row">

              <div className="repoNameContainer col-xs-12">
                <p className="repoName"> 
                {this.props.githubInfo.repoName}
                </p>
              </div> 
              <div className="repoDiscContainer col-xs-12">
                <p className="repoDisc">
                {this.props.githubInfo.repoDisc}
                </p>
              </div>
              <div className="repoTechContainer col-xs-12 row">
                <div className="techSVGContainer col-xs-1">            
                  <svg className="techSVG" height="10" width="10">
                    <circle cx="5" cy="5" r="5"  strokeWidth="1" fill={foundTechColor} />
                  </svg> 
                </div>
                <div className="repoTechTextContainer col-xs-11">
                  <p className="repoTech"> 
                  {this.props.githubInfo.repoTech[0]}
                  </p> 
                </div>
              </div>

            </div> 

            <div className="rightSide col-xs-12 col-sm-3 row">

              <div className="repoLastUpdateContainer col-xs-12">
                <p className="repoLastUpdate">
                Updated {this.props.githubInfo.repoLastUpdate}
                </p>
              </div>
              <div className="issueCardButtonContainer col-xs-12">
              <IssueCardButton githubInfo={this.props.githubInfo} className="issueCardButton"/>
              </div>

            </div> 

        </div>
      </div> 

    );
  }
}

class IssueCardButton extends Component {  
  render(){ 
    if (this.props.githubInfo.repoActiveStatus === true){ 
      return(
        <div className="btnGold">
        <h5>CREATE TOKEN</h5>
        </div>
      )
    }
    else { 
      return(
        <div className="btnSilver">
        <h5> GO TO PROJECT</h5>
        </div>
      )
    }
  }
}

export default IssueCard;

// for Maping incoming data to repos (takes array called IssueBountiesRepos)
// {this.state.IssueBountiesRepos.map((Element,i) => <IssueBountiesCard key={i} Repos={Element}/>)}


              // <div className="repoUserNameContainer col-xs-12">
              //   <p className="repoUserName"> 
              //   ({this.props.githubInfo.repoUserName})
              //   </p>
              // </div> 