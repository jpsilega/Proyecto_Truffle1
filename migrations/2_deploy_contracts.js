var Recyclables = artifacts.require("./Contracts/Recyclables.sol");
var Erc20 = artifacts.require("./Contracts/ERC20.sol");
var Intendence = artifacts.require("./Contracts/Intendence.sol");
var Container = artifacts.require("./Contracts/Container.sol");


module.exports = function(deployer) {     
      deployer.deploy(Recyclables);
      const name = "ORT";
      const symbol = "ORT";      
      deployer.deploy(Erc20,name,symbol);
      deployer.link(Erc20, Intendence);
      deployer.deploy(Intendence).then(function() {
            return deployer.deploy(Container, Intendence.address, Recyclables.address, "test");
      });
      

}