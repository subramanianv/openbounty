import React, { Component } from 'react';

// Called in each IssueCard component and displayed in the dashboard area. (HOME page) 

class BtnIssueCard extends Component {  
  render(){ 
    if (this.props.githubInfo1.repoActiveStatus === true){ 
      return(
        <div className="btnGold" onClick={()=> this.props.pageChange('CREATE')}>
        <h5> CREATE TOKEN </h5>
        </div>
      )
    }
    else { 
      return(
        <div className="btnSilver" onClick={()=> this.props.pageChange('MANAGE')}>
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