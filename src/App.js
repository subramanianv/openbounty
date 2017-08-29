import React, { Component } from 'react';
import './App.css';

// Importing Pages
import HomePage from './components/HomePage.js';
import LandingPage from './components/LandingPage.js';

import CreatePage from './components/CreatePage.js';
import CreatePage2 from './components/CreatePage2.js';

import RedeemPage from './components/RedeemPage.js';
import RedeemPage2 from './components/RedeemPage2.js';

import ClaimPage from './components/ClaimPage.js';
import ManagePage from './components/ManagePage.js';
import SeeProjectPage from './components/SeeProjectPage.js';

// Importing Footer
import Footer from './components/Footer.js';

class App extends Component {

    constructor(){
        super();
        this.state = {            
            page: 'LANDING',
            graphData:{},
            githubInfo:{},
            githubClaimInfo:{},
            githubUser:{},
            loginForm:'CLOSED',
            requestList:{}
        }
        this.goTo = this.goTo.bind(this);
        this.toggleLoginForm = this.toggleLoginForm.bind(this);
    }

    // Handle Page Changes
    goTo(pageName) {
        this.setState({
        page: pageName
        })
    }

    toggleLoginForm(){
      if(this.state.loginForm === "CLOSED"){
        this.setState({
          loginForm:"OPEN"
        })
      }
      else {
        this.setState({
          loginForm:"CLOSED"
        })
      }
    }

    componentWillMount(){
      this.getGraphData();
      this.getGithubInfo(); 
      this.getGithubUserInfo();
      this.getGithubClaimInfo();
      this.getRequestList();
    }

    // Get Data for userGraph.js

    getGraphData(){
      // AJAX CALLS HERE
      this.setState({
        graphData:{
          labels: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG'],
          datasets:[
            {              
              data: [100, 150, 170, 200, 260, 200, 180, 175],
            }
          ]
        }
      })
    }

    getRequestList(){
      this.setState({
        // dummyRequests - placeholder Data
        requestList:
          [
            {
              userName : "svinkle",
              etherAmount : "5",
              tokenAmount : "50",
              timeSent : "25 Minutes Ago", 
              tokenName: "OBT" 
            },
            {
              userName : "SPTechnology",
              etherAmount : "3",
              tokenAmount : "30",
              timeSent : "30 Minutes Ago", 
              tokenName: "SAZ" 
            },
            {
              userName : "anne_sullivan",
              etherAmount : "6",
              tokenAmount : "60",
              timeSent : "2 Days Ago", 
              tokenName: "FAT" 
            },
            {
              userName : "timmster1010",
              etherAmount : "1",
              tokenAmount : "10",
              timeSent : "3 Days Ago", 
              tokenName: "HAX" 
            },
            {
              userName : "92_johnd",
              etherAmount : "3",
              tokenAmount : "30",
              timeSent : "5 Days Ago", 
              tokenName: "KIT" 
            },
          ]
      })
    } 


    // Get User Info for Activity Feed
    getGithubUserInfo(){
      // AJAX CALLS HERE
      this.setState({
        // dummyGithubUser - placeholder Data
        githubUser:{ 
          userName: "SPTechnology",
          avatarURL: "https://avatars0.githubusercontent.com/u/20861999?v=4&u=28797089c2101e9e72b1bc5cf67e50160302c750&s=400",
          events: 
           [
            {
              "id": "1",
              "repository": {
                "id": 1296269,
                "owner": {
                  "login": "octocat",
                  "id": 1,
                  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
                  "gravatar_id": "",
                  "url": "https://api.github.com/users/octocat",
                  "html_url": "https://github.com/octocat",
                  "followers_url": "https://api.github.com/users/octocat/followers",
                  "following_url": "https://api.github.com/users/octocat/following{/other_user}",
                  "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
                  "organizations_url": "https://api.github.com/users/octocat/orgs",
                  "repos_url": "https://api.github.com/users/octocat/repos",
                  "events_url": "https://api.github.com/users/octocat/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/octocat/received_events",
                  "type": "User",
                  "site_admin": false
                },
                "name": "Hello-World",
                "full_name": "octocat/Hello-World",
                "description": "This is my first attempt, stoked to send some good code over",
                "private": false,
                "fork": false,
                "url": "https://api.github.com/repos/octocat/Hello-World",
                "html_url": "https://github.com/octocat/Hello-World"
              },
              "subject": {
                "title": "Sending you a pull request!",
                "url": "https://api.github.com/repos/octokit/octokit.rb/issues/123",
                "latest_comment_url": "https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
                "type": "Issue"
              },
              "reason": "subscribed",
              "unread": true,
              "updated_at": "2014-11-07T22:01:45Z",
              "last_read_at": "2014-11-07T22:01:45Z",
              "url": "https://api.github.com/notifications/threads/1"
            },
          
            {
              "id": "2",
              "repository": {
                "id": 1296269,
                "owner": {
                  "login": "octocat",
                  "id": 1,
                  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
                  "gravatar_id": "",
                  "url": "https://api.github.com/users/octocat",
                  "html_url": "https://github.com/octocat",
                  "followers_url": "https://api.github.com/users/octocat/followers",
                  "following_url": "https://api.github.com/users/octocat/following{/other_user}",
                  "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
                  "organizations_url": "https://api.github.com/users/octocat/orgs",
                  "repos_url": "https://api.github.com/users/octocat/repos",
                  "events_url": "https://api.github.com/users/octocat/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/octocat/received_events",
                  "type": "User",
                  "site_admin": false
                },
                "name": "Hello-World",
                "full_name": "octocat/Hello-World",
                "description": "Just completed a ton of new work - sending pull request through now!",
                "private": false,
                "fork": false,
                "url": "https://api.github.com/repos/octocat/Hello-World",
                "html_url": "https://github.com/octocat/Hello-World"
              },
              "subject": {
                "title": "Accepted Pull Request",
                "url": "https://api.github.com/repos/octokit/octokit.rb/issues/123",
                "latest_comment_url": "https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
                "type": "Issue"
              },
              "reason": "subscribed",
              "unread": true,
              "updated_at": "2014-11-07T22:01:45Z",
              "last_read_at": "2014-11-07T22:01:45Z",
              "url": "https://api.github.com/notifications/threads/1"
            },

            {
              "id": "3",
              "repository": {
                "id": 1296269,
                "owner": {
                  "login": "octocat",
                  "id": 1,
                  "avatar_url": "https://github.com/images/error/octocat_happy.gif",
                  "gravatar_id": "",
                  "url": "https://api.github.com/users/octocat",
                  "html_url": "https://github.com/octocat",
                  "followers_url": "https://api.github.com/users/octocat/followers",
                  "following_url": "https://api.github.com/users/octocat/following{/other_user}",
                  "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
                  "organizations_url": "https://api.github.com/users/octocat/orgs",
                  "repos_url": "https://api.github.com/users/octocat/repos",
                  "events_url": "https://api.github.com/users/octocat/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/octocat/received_events",
                  "type": "User",
                  "site_admin": false
                },
                "name": "Hello-World",
                "full_name": "octocat/Hello-World",
                "description": "Doubling payout for VINK App - we need some significant contributions folks!",
                "private": false,
                "fork": false,
                "url": "https://api.github.com/repos/octocat/Hello-World",
                "html_url": "https://github.com/octocat/Hello-World"
              },
              "subject": {
                "title": "Created some new Tokens",
                "url": "https://api.github.com/repos/octokit/octokit.rb/issues/123",
                "latest_comment_url": "https://api.github.com/repos/octokit/octokit.rb/issues/comments/123",
                "type": "Issue"
              },
              "reason": "subscribed",
              "unread": true,
              "updated_at": "2014-11-07T22:01:45Z",
              "last_read_at": "2014-11-07T22:01:45Z",
              "url": "https://api.github.com/notifications/threads/1"
            }
          
          
          ]

        }   
      })
    }

    // Get Data For Home Page Dashboard Cards
    getGithubInfo(){
      // AJAX CALLS HERE
      this.setState({
        // DUMMY GITHUB INFO BELOW
        githubInfo:
          [
            {
              repoName : "openbounty_development",
              repoUserName : "SPTechnology",
              repoDisc : "Scaffolding for openbounty project, looking for devs to contribute! Tokens available.",
              repoTech : ['JavaScript ', 'HTML ', 'CSS '], 
              repoLastUpdate : "2 Days Ago", 
              repoActiveStatus : false
            },
            { 
              repoName : "Music_Visualizer-",
              repoUserName : "SPTechnology",
              repoDisc : "Program to Visualize multiple songs - HTML5,CSS3, JS, React.JS.",
              repoTech : ['HTML ', 'CSS '], 
              repoLastUpdate : "5 Days Ago", 
              repoActiveStatus : true
            },
            {
              repoName : "google-maps-services-python",
              repoUserName : "SPTechnology",
              repoDisc : "Scaffolding for openbounty project, looking for devs to contribute! Tokens available.",
              repoTech : ['Python '], 
              repoLastUpdate : "20 Days Ago", 
              repoActiveStatus : false
            },
            { 
              repoName : "Responsive-Tutorial",
              repoUserName : "Timmy1251",
              repoDisc : "Creating a HTML5/CSS3 responsive template from scratch from a youtube tutorial.",
              repoTech : ['CSS ', 'JavaScript ', 'HTML '], 
              repoLastUpdate : "2 Weeks Ago", 
              repoActiveStatus : false
            },
            {
              repoName : "VINK APP",
              repoUserName : "SPTechnology",
              repoDisc : "Scan your favorite beer with this mobile-first app.",
              repoTech : ['JavaScript ', 'HTML ', 'CSS '], 
              repoLastUpdate : "4 Weeks Ago", 
              repoActiveStatus : true
            },
            { 
              repoName : "First Attempt at PHP",
              repoUserName : "SPTechnology",
              repoDisc : "Scaffolding for openbounty project, looking for devs to contribute! Tokens available.",
              repoTech : ['PHP ', 'HTML ', 'CSS '], 
              repoLastUpdate : "4 Hours Ago", 
              repoActiveStatus : true
            },
          ]
      })
    } 


    // Get Data For Claim Page Dashboard Cards
    getGithubClaimInfo(){
      // AJAX CALLS HERE
      this.setState({
        // DUMMY GITHUB INFO BELOW
        githubClaimInfo:
          [
            { 
              repoName : "Music_Visualizer-",
              repoUserName : "SPTechnology",
              repoDisc : "Program to Visualize multiple songs - HTML5,CSS3, JS, React.JS.",
              repoTech : ['HTML ', 'CSS '], 
              repoLastUpdate : "5 Days Ago", 
              repoActiveStatus : true
            },
            {
              repoName : "google-maps-services-python",
              repoUserName : "SPTechnology",
              repoDisc : "Scaffolding for openbounty project, looking for devs to contribute! Tokens available.",
              repoTech : ['Python '], 
              repoLastUpdate : "20 Days Ago", 
              repoActiveStatus : false
            },
            { 
              repoName : "Responsive-Tutorial",
              repoUserName : "Timmy1251",
              repoDisc : "Creating a HTML5/CSS3 responsive template from scratch from a youtube tutorial.",
              repoTech : ['CSS ', 'JavaScript ', 'HTML '], 
              repoLastUpdate : "2 Weeks Ago", 
              repoActiveStatus : false
            },
            {
              repoName : "VINK APP",
              repoUserName : "SPTechnology",
              repoDisc : "Scan your favorite beer with this mobile-first app.",
              repoTech : ['JavaScript ', 'HTML ', 'CSS '], 
              repoLastUpdate : "4 Weeks Ago", 
              repoActiveStatus : true
            },
            { 
              repoName : "First Attempt at PHP",
              repoUserName : "SPTechnology",
              repoDisc : "Scaffolding for openbounty project, looking for devs to contribute! Tokens available.",
              repoTech : ['PHP ', 'HTML ', 'CSS '], 
              repoLastUpdate : "4 Hours Ago", 
              repoActiveStatus : true
            },
            {
              repoName : "openbounty_development",
              repoUserName : "SPTechnology",
              repoDisc : "Scaffolding for openbounty project, looking for devs to contribute! Tokens available.",
              repoTech : ['JavaScript ', 'HTML ', 'CSS '], 
              repoLastUpdate : "2 Days Ago", 
              repoActiveStatus : false
            }
          ]
      })
    } 


  render() {

    let pageContent = "pageContentEmpty"
    if (this.state.page === "LANDING") {pageContent = <LandingPage toggleLoginForm={()=>this.toggleLoginForm()} loginForm={this.state.loginForm} pageState={this.state.page} pageChange={(x)=> this.goTo(x)}/>};
    if (this.state.page === "HOME") {pageContent = <HomePage pageState={this.state.page} graphData={this.state.graphData} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};
    if (this.state.page === "CLAIM") {pageContent = <ClaimPage pageState={this.state.page} graphData={this.state.graphData} githubClaimInfo={this.state.githubClaimInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};

    if (this.state.page === "REDEEM") {pageContent = <RedeemPage pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};
    if (this.state.page === "REDEEM_2") {pageContent = <RedeemPage2 pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};

    if (this.state.page === "CREATE") {pageContent = <CreatePage pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};
    if (this.state.page === "CREATE_2") {pageContent = <CreatePage2 pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};

    if (this.state.page === "MANAGE") {pageContent = <ManagePage requestList={this.state.requestList} pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};
    if (this.state.page === "SEE PROJECT") {pageContent = <SeeProjectPage requestList={this.state.requestList} pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};

    console.log("Page State is: " + this.state.page);
  
    return (
      <div className="mainContainer">

        <div className="appContents">
          {pageContent}
        </div>

        <Footer/>

      </div>
    );
  }
}






export default App;



