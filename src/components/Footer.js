import React, { Component } from 'react';

// Feel free to remove, but it helps with responsiveness a bit too. 

class Footer extends Component {
  render() {
    return (
        <div className='footerContainer col-xs-12'> 
          <div className='footerContent col-xs-12'>
            <p> © 2017 OpenBounty - All Rights Reserved </p>
          </div>
        </div>
    );
  }
}

export default Footer;