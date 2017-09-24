import React, { Component } from 'react';

// Called in each IssueCard component and displayed in the dashboard area. (HOME page)

class BtnIssueCard extends Component {
  render(){
    console.log(this.props.githubInfo1.projectHasToken)
    if (this.props.githubInfo1.projectHasToken === false){
      return(
        <div className="btnGold" onClick={()=> this.props.createTokenBtnHandler(this.props.githubInfo1)}>
        <h5> CREATE TOKEN </h5>
        </div>
      )
    }
    else {
      return(
        <div className="btnSilver" onClick={()=> this.props.manageRepo(this.props.githubInfo1)}>
        <h5> GO TO PROJECT</h5>
        </div>
      )
    }
  }
}


export default BtnIssueCard;

// for Maping incoming data to repos (takes array called IssueBountiesRepos)
// {this.state.IssueBountiesRepos.map((Element,i) => <IssueBountiesCard key={i} Repos={Element}/>)}


              // <div className="repoUserNameContainer col-xs-12">
              //   <p className="repoUserName">
              //   ({this.props.githubInfo.repoUserName})
              //   </p>
              // </div>
