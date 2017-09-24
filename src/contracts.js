import * as truffle from 'truffle-contract';
import JobRegistration from './build/contracts/JobRegistration.json';
import JobTracker from './build/contracts/JobTracker.json';
import HumanStandardToken from './build/contracts/HumanStandardToken.json';
import AddressRegistration from './build/contracts/AddressRegistration.json';



export default function instantiateContract(options, callback) {

  let jrAddress;
  let jTAddress;
  let network_id = options.network_id;
  debugger;
  if (options.network_id && JobTracker.networks[network_id]) {
      jTAddress  = JobTracker.networks[network_id].address
  }
  if (options.network_id && JobRegistration.networks[network_id]) {
    jrAddress = JobRegistration.networks[network_id].address;
  }
  debugger;
  let hst = truffle(HumanStandardToken);
  hst.setProvider(options.web3.currentProvider);
  hst.setNetwork(options.network_id);

  let jT = truffle(JobTracker);
  jT.setProvider(options.web3.currentProvider);
  jT.setNetwork(options.web3.network_id);

  let jr = truffle(JobRegistration);
  jr.setProvider(options.web3.currentProvider);
  jr.setNetwork(options.web3.network_id);

  let ar = truffle(AddressRegistration);
  ar.setNetwork(options.web3.network_id);
  ar.setProvider(options.web3.currentProvider);

  callback(null,
  {
    JobTracker : { JobTracker : jT, bin : JobTracker.unlinked_binary, abi : JobTracker.abi, address : jTAddress},
    JobRegistration : {JobRegistration: jr, bin : JobRegistration.unlinked_binary, abi : JobRegistration.abi, address : jrAddress},
    HumanStandardToken : hst
  });
}
