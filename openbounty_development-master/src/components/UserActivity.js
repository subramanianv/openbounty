import React, { Component } from 'react';
import ActivityBar from '../images/ActivityBar.png';

class UserActivity extends Component {
  render() {

    // const userName = this.props.githubUser.userName;
    // const avatarURL = this.props.githubUser.avatarURL;
    const events = this.props.githubUser.events;

    console.log(events);
 
    return (
    <div className="feedContainer col-xs-12 row"> 

      <h3 className="feedTitle"> Latest Activities </h3> 
      <div className="githubFeed col-xs-12 row">
      
      <img className="activityBarImg col-xs-offset-1" src={ActivityBar} alt="activityBar"/>

      <div className="feedStream col-xs-11 col-xs-offset-1 row">

        <div className="activityBox col-xs-12 row">
          <h3 className="activityTitle col-xs-8"> {this.props.githubUser.events[0].subject.title} </h3>
          <p className="activityTime col-xs-4"> {this.props.githubUser.events[0].updated_at.substring(0,10)} </p>
          <p className="activityText col-xs-12"> {this.props.githubUser.events[0].repository.description} </p>
        </div>

        <div className="activityBox secondaryBox col-xs-12  row">
          <h3 className="activityTitle col-xs-8"> {this.props.githubUser.events[1].subject.title} </h3>
          <p className="activityTime col-xs-4"> {this.props.githubUser.events[1].updated_at.substring(0,10)} </p>
          <p className="activityText col-xs-12"> {this.props.githubUser.events[1].repository.description} </p>
        </div>

        <div className="activityBox secondaryBox col-xs-12 row"> 
          <h3 className="activityTitle col-xs-8"> {this.props.githubUser.events[2].subject.title} </h3>
          <p className="activityTime col-xs-4"> {this.props.githubUser.events[2].updated_at.substring(0,10)} </p>
          <p className="activityText col-xs-12"> {this.props.githubUser.events[2].repository.description} </p>
        </div>
     
      </div>

      </div>
    </div>   
    );
  }
}


        // <p>
        //  {userName}
        // </p>

        // <img src={avatarURL} alt="avatar" />

        
// {this.state.IssueBountiesRepos.map((Element,i) => <IssueBountiesCard key={i} Repos={Element}/>)}


export default UserActivity;