import React, { Component } from 'react';

// Importing Tools
import jump from 'jump.js'
// for jump documentation go here: https://github.com/callmecavs/jump.js#target

// importing Images
import Logo_Black from '../images/Logo_Black.svg';
import Icon1 from '../images/LandingPage_Icon1.svg';
import Icon2 from '../images/LandingPage_Icon2.svg';
import Icon3 from '../images/LandingPage_Icon3.svg';

// import components
import LoginBox from "./LoginBox";





class LandingPage extends Component {
  render() {

    let loginContent = '';

    if(this.props.loginForm === "CLOSED"){
      loginContent='';
    }
    else if (this.props.loginForm === "OPEN"){

      loginContent=<LoginBox pageChange={(x)=>this.props.pageChange(x)} />
    }

    return (

      <div className='landingPageContainer'> 

        <div className="appHeader">

            <div className="topBar col-xs-12 col-xs-offset-1"> 
              <img src={Logo_Black} className="appLogo mainPageAppLogo" alt="logo "/>
              <h3 onClick={()=>{this.props.toggleLoginForm()}} className=" btn topBarNavRight hidden-xs hidden-sm noPadd"> LOGIN / SIGNUP </h3>
            </div>

            <div className="heroTextContainer col-xs-10 col-xs-offset-1 col-md-4 noPadd">
              <h1 className="heroTitleText"> Welcome to OpenBounty </h1> 
              <h3 className="heroText"> 
                Open Bounty is a blockchain development platform
                designed to help developers get rewarded for their
                contributions and for project owners to get quality
                code, quickly and reliably.
              </h3> 
            </div> 

            <div className="heroLandingButtons col-xs-10 col-xs-offset-1 col-md-10 col-md-offset-1 noPadd">
              <div className="btnLandingWhite col-xs-12 col-sm-2" type="button" onClick={()=>{this.props.toggleLoginForm()}}>GET STARTED</div>
              <div id="seeHowItWorks" className="col-xs-12 col-sm-2 btn " onClick={()=> jump('.midBox')}><strong> & See How it Works </strong></div>
            </div>



            {loginContent} 

            <div className="col-xs-12 col-lg-10 col-lg-offset-1 midBox">

                <div className="s2TopTextContainer col-xs-12 row"> 
                    <div className="midBoxSmallBox col-xs-12 col-md-4 " >
                      <img src={Icon1} className="midBoxIcon1 MBI" alt="Icon" /> 
                      <h1 className="midBoxTitle" >Get Bounty Tokens</h1>
                      <p> 
                        Et case aliquip accusata eam, ad
                        eam oratio verear consequuntur.
                      </p>
                    </div>

                    <div className="midBoxSmallBox col-xs-12 col-md-4">
                      <img src={Icon2} className="midBoxIcon2 MBI" alt="Icon" /> 
                      <h1 className="midBoxTitle">Contribute with Code</h1>
                      <p> 
                        Et case aliquip accusata eam, ad
                        eam oratio verear consequuntur.
                      </p>
                    </div>

                    <div className="midBoxSmallBox col-xs-12 col-md-4 ">
                      <img src={Icon3} className="midBoxIcon3 MBI" alt="Icon" /> 
                      <h1 className="midBoxTitle" >Manage Projects</h1>
                      <p> 
                        Et case aliquip accusata eam, ad
                        eam oratio verear consequuntur.
                      </p>
                    </div>
                      
              </div>

            </div>

        </div>


        <div className="sectionTwoBox col-sm-12">
         
        <div className="s2BottomTextContainer col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">   
          <div className="s2BottomBox col-xs-12 col-md-offset-1 col-md-10">
              <h1 className="s2BottomBoxTitle" id="midTitle">Erat munere gloriatur et nam</h1>
              <p> 
                Cu eam disputationi delicatissimi. Has ex quodsi iudicabit. Et case
                aliquip accusata eam, ad eam oratio verear consequuntur. Sale
                scaevola cu vim. Eum ipsum etiam eu, erat munere gloriatur et nam,
                probo quando et eos. Dicunt perpetua nec et, detraxit quaestio

                reformidans ei sit. Sit viris appetere molestiae ut.
              </p>
            </div>
          </div>

        </div> 

        <div className="sectionThreeBox col-sm-12">
        </div>

        <div className="sectionFourBox col-xs-12">


            <div className="s4TextContainer col-xs-10 col-xm-offset-1 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
              <h1 className="s4TopTextTitle"> Erat munere gloriatur et nam </h1>

                <ol>

                  <li> 
                  <h3 className="listTitle" > First do this </h3>
                  <p className="listText" > 
                    Et case aliquip accusata eam, ad eam oratio verear
                    consequuntur. Sale scaevola cu vim.
                  </p> 
                  </li>
                  <li> 
                  <h3 className="listTitle" > Then do that </h3>
                  <p className="listText" > 
                    Et case aliquip accusata eam, ad eam oratio verear
                    consequuntur. Sale scaevola cu vim.
                  </p> 
                  </li>
                  <li> 
                  <h3 className="listTitle" > Then do that </h3>
                  <p className="listText" > 
                    Et case aliquip accusata eam, ad eam oratio verear
                    consequuntur. Sale scaevola cu vim.
                  </p> 
                  </li>
                  <li> 
                  <h3 className="listTitle" > And finally do this </h3>
                  <p className="listText" > 
                    Et case aliquip accusata eam, ad eam oratio verear
                    consequuntur. Sale scaevola cu vim.
                  </p> 
                  </li>

                </ol>
            </div>




            <div className="s4BottomTextContainer col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3 row">

              <div className="row col-xs-12">
                <div className="btnLandingBlack col-xs-4 col-xs-offset-4 " onClick={()=>{this.props.pageChange('HOME'); jump('.topBar');}} > GET STARTED
                </div> 
              </div> 

              <h2 className="s4BottomTextTitle" id="bottomTitle"> Erat munere gloriatur et nam </h2>
              <h3 className="s4BottomText col-md-8 col-md-offset-2"> 
                Cu eam disputationi delicatissimi. Has ex quodsi iudicabit. Et case
                aliquip accusata eam, ad eam oratio verear consequuntur. Sale
                scaevola cu vim. Eum ipsum etiam eu, erat munere gloriatur et nam,
                probo quando et eos. Dicunt perpetua nec et, detraxit quaestio
                reformidans ei sit. Sit viris appetere molestiae ut.
              </h3> 
            
            </div> 




        </div>

      </div>

    );
  }
}






export default LandingPage;

