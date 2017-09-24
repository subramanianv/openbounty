let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
      var results
      var web3 = window.web3
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      results = {
          web3: web3,
          network_id : 3
      }
      console.log('Injected web3 detected.');
      resolve(results)
    })
})

export default getWeb3
