import React, { Component } from 'react';


// Called in each ClaimCard component and displayed in the dashboard area. (CLAIM page)

class BtnClaimCard extends Component {  
  render(){ 
    if (this.props.githubClaimInfo1.repoActiveStatus === true){ 
      return(
        <div className="btnGold" onClick={()=> this.props.pageChange('REDEEM')}>
        <h5> REDEEM TOKENS </h5>
        </div>
      )
    }
    else { 
      return(
        <div className="btnSilver" onClick={()=> this.props.pageChange('SEE PROJECT')}>
        <h5> SEE PROJECT </h5>
        </div>
      )
    }
  }
}

export default BtnClaimCard;

// for Maping incoming data to repos (takes array called IssueBountiesRepos)
// {this.state.IssueBountiesRepos.map((Element,i) => <IssueBountiesCard key={i} Repos={Element}/>)}


              // <div className="repoUserNameContainer col-xs-12">
              //   <p className="repoUserName"> 
              //   ({this.props.githubClaimInfo.repoUserName})
              //   </p>
              // </div> 