import React, { Component } from 'react';
import cookie from 'react-cookies'
import './App.css';
import * as xhr from 'xhr';

import * as ethutils from 'ethereumjs-util';
import instantiateContract from './contracts.js';
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
import * as jsonp from 'jsonp';
import getWeb3 from './utils/getWeb3'
import * as async from 'async'
// Importing Footer
import Footer from './components/Footer.js';

import * as Promise from 'bluebird';

class App extends Component {

    constructor() {
        super();
        this.state = {
            page: 'LANDING',
            graphData:{},
            githubInfo:[],
            githubClaimInfo:{},
            githubUser:{},
            loginForm:'CLOSED',
            requestList:[]
        }
        this.goTo = this.goTo.bind(this);
        this.toggleLoginForm = this.toggleLoginForm.bind(this);
    }
    setUserPayoutAddress() {
      let web3 = this.state.bc.web3;
      let from = web3.eth.accounts[0];
      let self = this;
      var text = "You are setting the payout address to " + from + " and your github login is " + this.state.login;
      var msg = ethutils.bufferToHex(new Buffer(text, 'utf8'))
      var params = [msg, from]
      var method = 'personal_sign'

      web3.currentProvider.sendAsync({
        method,
        params,
        from,
      }, function(error, msg) {
        if (error) {
            return;
        }

        let body = {
            signature : msg.result,
            payoutAddress : from,
            username : self.state.login
        }
        debugger;
        xhr({
            method : "POST",
            uri : 'http://ec2-34-227-238-42.compute-1.amazonaws.com:8000/userAddress',
            body : JSON.stringify(body),
            headers: {
              "Content-Type": "application/json"
            }
        }, function(error, result) {
            console.log(error, result);
        })
      });
    }

    manageBounty(action, PR, repo) {

      var id = PR.id;
      let self = this;
      let JobTracker = this.state.bc.contracts.JobTracker.JobTracker;
      let web3 = this.state.bc.web3;
      let HumanStandardToken = this.state.bc.contracts.HumanStandardToken;
      let jT = JobTracker.at(repo.address);

      if (action === 'ACCEPT AND SEND BOUNTY') {
        jT.acceptWork(id, PR.address, {from : web3.eth.accounts[0]}).then((tx) => {
          return new Promise((resolve, reject) => {
            xhr({
              method : "PUT",
              uri : "http://ec2-34-227-238-42.compute-1.amazonaws.com:8000/PR/" + id + "/close",
              body : null
            },
            (error, r) => {
                if (error) {
                  reject(error);
                }
                else {
                  resolve()
                }
          })
          // debugger;
          // self.manageRepo(repo);
        }).then(() => {
           debugger;
            self.manageRepo(repo);
        })

      })
    }
      else {
        var numTokens = prompt("How many tokens do you want to assign for this PR ? ");
        if (!numTokens) {
          return alert("Enter a proper value. It should be a number and greater than 0")
        }



        jT.createBounty(PR.id, numTokens, {from : web3.eth.accounts[0]}).then((tx) => {
          return new Promise((resolve, reject) => {
            xhr({
              method: "put",
              uri: "http://ec2-34-227-238-42.compute-1.amazonaws.com:8000/PR/" + id + "/tokens/" + numTokens,
              body : null
            }, (err, result) => {
              debugger;
                if (err) {
                  reject(err)
                }
                else resolve(result);
            })
        }).then(() => {
            self.manageRepo(repo);
        });
      });


    }
  }
    manageRepo(repo) {
      debugger;
      let self = this;
      let JobTracker = this.state.bc.contracts.JobTracker.JobTracker;
      let HumanStandardToken = this.state.bc.contracts.HumanStandardToken;
      let web3 = this.state.bc.web3;
      let jT = JobTracker.at(repo.address);


      async.waterfall([
        (callback) => {
          jT.tokenAddress().then((tokenAddress) => {
            callback(null, tokenAddress);
          })
        },
        (tokenAddress, callback) => {
          let t = HumanStandardToken.at(tokenAddress);
          t.symbol().then((tokenSymbol) => {
            callback(null, t, tokenAddress, tokenSymbol);
          })
        },
        (token, tokenAddress, tokenSymbol, callback) => {
          jT.bountyCreator().then((creator) => {
            callback(null, token, tokenAddress, tokenSymbol, creator);
          });
        },
        (token, tokenAddress,tokenSymbol, creator, callback) => {
          debugger;
          token.balanceOf(web3.eth.accounts[0]).then((x)=> {
              console.log(x.toString());
          });
          token.balanceOf(repo.address).then((allowance) => {
            callback(null, tokenAddress, tokenSymbol, creator, parseInt(allowance.toString(10)))
          });
        },
        (tokenAddress, tokenSymbol, creator, allowance, callback) => {
          debugger;
          xhr({
            method :'GET',
            uri : 'http://ec2-34-227-238-42.compute-1.amazonaws.com:8000/PR/' + repo.id,

          }, (error, PRs) => {
            PRs = JSON.parse(PRs.body);
            callback(error, tokenAddress, tokenSymbol, creator, allowance, PRs)
          })
        },
      ], (error, tokenAddress, tokenSymbol, creator, allowance, PRs) => {

          let currentRepo = Object.assign({}, repo, {tokenAddress: tokenAddress, tokenSymbol : tokenSymbol, creator : creator, allowance : allowance});
          self.setState({currentRepo : currentRepo, PRs : PRs});
          self.goTo("MANAGE");

      });
    }

    addTokens(repo) {
      let self = this;
      var name = repo.name;
      name = name[0].toUpperCase() + name.slice(1);
      var numTokens = prompt("How many tokens do you want to add to " + name + ' ?');
      numTokens = parseInt(numTokens);
      if (!numTokens || numTokens <=0) {
        return alert("The number of tokens must be greater than 0");
      }
      let web3 = this.state.bc.web3;
      let HumanStandardToken = this.state.bc.contracts.HumanStandardToken
      let token = HumanStandardToken.at(repo.tokenAddress);
      token.transfer(repo.address, numTokens, {from : web3.eth.accounts[0]}).then((tx) => {
        debugger;
        self.manageRepo(repo);
      });
    }

    // Handle Page Changes
    goTo(pageName) {
      let self = this;
      if (pageName === 'HOME') {
        async.parallel({
          githubInfo : function(callback) {
            self.getRepos(self.state.accessToken, self.state.login, self.state.bc, (error, repos) => {
                callback(error, repos);
            });
          },
          userInfo : function(callback) {
            debugger;
            xhr({
              uri : 'http://ec2-34-227-238-42.compute-1.amazonaws.com:8000/userAddress?login=' + self.state.login,
              method : 'GET'
            }, function(error, r) {
               if(error || !r || !r.body) {
                 callback(null, {address : null});
               }
               else {
                 var r =  JSON.parse(r.body);
                 callback(null, r);
               }

            });
          }
        },
        function(error, results) {
            self.setState({page : pageName, userAddress : results.userInfo.address, githubInfo : results.githubInfo});
        });
      }
      else if (pageName === 'CREATE') {
        this.setState({page : pageName})
      }
      else if(pageName === 'MANAGE'){
        this.state.page = pageName;
        this.forceUpdate();
      }

    }

    setupWebhooks(options) {
      let body = {
        "name": "web",
        "active": true,
        "events": [
          "pull_request",
          "issue_comment",
          "label"
        ],
        "config": {
          "url": "http://ec2-34-227-238-42.compute-1.amazonaws.com:8000/events/" + options.repo.id,
          "content_type": "json"
        }
      };
      return new Promise((resolve, reject) => {
        xhr({
          method: "post",
          uri: "https://api.github.com/repos/" + options.repo.owner.login + "/" + options.repo.name+ "/hooks",
          body : JSON.stringify(body),
          headers: {
            "Authorization" : "token " + options.accessToken
          }
        }, (err, result) => {
            if (err) {
              reject(err)
            }
            else resolve(result);
        });
    })
  }
  createLabel(options) {
    return new Promise((resolve, reject) => {
      xhr({
        method : "post",
        uri : "https://api.github.com/repos/" + options.repo.owner.login + "/" + options.repo.name + "/labels",
        body : JSON.stringify({name : "OpenBounty", "color": "f29513"}),
        headers: {
          "Authorization" : "token " + options.accessToken
        }
      }, (err, result) => {
        if (err) {
          reject(err);
        }
        else resolve(result)
      })
    })
  }

    createNewTokenContract(token) {


      let self = this;
      let bc = this.state.bc
      let web3 = this.state.bc.web3;
      let HumanStandardToken = bc.contracts.HumanStandardToken;


      let JobRegistration = bc.contracts.JobRegistration.JobRegistration;
      const totalSupply = parseInt(token.totalSupply);
      let JobTracker = bc.contracts.JobTracker.JobTracker;
      HumanStandardToken.new(totalSupply, token.repoName, 3, token.tokenSymbol, {from : web3.eth.accounts[0]}).then((newContract) => {
        return JobTracker.new(newContract.address, token.id , {from : web3.eth.accounts[0], value : web3.toWei(token.ethAmount,'ether')})
      }).then((jt)=> {
        return JobRegistration.deployed().then((jrInstance) => {
          return jrInstance.addJobTracker(token.id, jt.address, {from : web3.eth.accounts[0]})
        });
      }).then((tx)=>{
        return self.setupWebhooks({repo : token, accessToken : self.state.accessToken})
      }).then(() => {
        self.goTo("HOME")
      }).

      catch((e) => {
        console.log(e);
      });
    }

    createTokenBtnHandler(repo) {
      this.setState({
        tokenRepo : repo
      })
      this.goTo('CREATE');

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

    componentWillMount() {
      let accessToken = cookie.load('accessToken')
      let login = cookie.load('login')
      if (!login || !accessToken) {
        return;
      }
      let self = this;
      getWeb3.then(result => {
        console.log(result.web3);
        instantiateContract({web3 : result.web3, network_id : result.network_id}, (err, contracts) => {
          self.setState({ accessToken : accessToken, login : login, bc : {contracts : contracts, web3 : result.web3, network_id : result.network_id}}, () => {
            self.goTo("HOME");
          });
        })
      })


    }



    getRepos(accessToken, login, bc, callback) {

      let url = "https://api.github.com/user/repos?type=owned&access_token=" + accessToken;
      jsonp(url, (err, result) => {
        let repos = result.data.filter(repo => repo.owner.login === login)
        repos  = repos.map((repo) => {
            return Object.assign({}, {id : repo.id,
                repoName: repo.name,
                repoUserName: repo.owner.login,
                repoLastUpdate : "2 Days Ago",
                repoDisc : repo.description || '',
                "repoTech" : [repo.language || 'Language N/A'],
                "repoActiveStatus" : true
            }, repo)
        });

        let JobRegistration = bc.web3.eth.contract(bc.contracts.JobRegistration.abi);
        let instance = JobRegistration.at(bc.contracts.JobRegistration.address);
        instance.getJobTracker.call(repos[0].id, console.log);
        async.map(repos, (repo, _c) => {
          instance.getJobTracker.call(repo.id, _c);
        }, (err, repoArray)=> {
          repos = repos.map((repo, i) => {
            var repoAddress = repoArray[i]
            var isValidAddress = false;
            if (repoAddress && repoAddress.length < 42) {
              isValidAddress = false;
            }
            else if(repoAddress && repoAddress === '0x0000000000000000000000000000000000000000') {
              isValidAddress = false;
            }
            else {
              isValidAddress = true;
            }
            repo.projectHasToken = isValidAddress;
            repo.address = repoArray[i];
            return repo;
          });
          callback(null, repos)
        })
      });
    }

    render() {

    let pageContent = "pageContentEmpty"
    console.log(this.state.page);
    if (this.state.page === "LANDING") {pageContent = <LandingPage toggleLoginForm={()=>this.toggleLoginForm()} loginForm={this.state.loginForm} pageState={this.state.page} pageChange={(x)=> this.goTo(x)}/>};
    if (this.state.page === "HOME") {pageContent = <HomePage setUserPayoutAddress = {this.setUserPayoutAddress.bind(this)} userAddress = {this.state.userAddress} manageRepo = {this.manageRepo.bind(this)} pageState={this.state.page} graphData={this.state.graphData} githubInfo={this.state.githubInfo}  createTokenBtnHandler = {this.createTokenBtnHandler.bind(this)} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};
    if (this.state.page === "CLAIM") {pageContent = <ClaimPage pageState={this.state.page} graphData={this.state.graphData} githubClaimInfo={this.state.githubClaimInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};

    if (this.state.page === "REDEEM") {pageContent = <RedeemPage pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};
    if (this.state.page === "REDEEM_2") {pageContent = <RedeemPage2 pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};

    if (this.state.page === "CREATE") {pageContent = <CreatePage createNewTokenContract = {this.createNewTokenContract.bind(this)} pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} repo = {this.state.tokenRepo} pageChange={(x)=> this.goTo(x)}/>};
    if (this.state.page === "CREATE_2") {pageContent = <CreatePage2 pageState={this.state.page} githubInfo={this.state.githubInfo} githubUser={this.state.githubUser} pageChange={(x)=> this.goTo(x)}/>};

    if (this.state.page === "MANAGE") {pageContent = <ManagePage onButtonClick = {this.manageBounty.bind(this)}  addTokens = {this.addTokens.bind(this)} repo = {this.state.currentRepo} pageState={this.state.page} repo={this.state.currentRepo} githubUser={this.state.githubUser} PRs= {this.state.PRs} pageChange={(x)=> this.goTo(x)}/>};
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
