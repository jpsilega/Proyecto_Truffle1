const Intendence = artifacts.require("Intendence");
const Erc20 = artifacts.require("ERC20");
const truffleAssert = require('truffle-assertions');

contract("Intendence", accounts => {
  const owner = accounts[0];
  const account = accounts[1];
  var meta;
  var tokenContract;

  /*function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }*/

  
  it("addMintable", () =>      
    Intendence.deployed()
   /* .then(async (instance) => {
      meta = instance;
      await meta.addMintable(accounts[1], { from: accounts[0] });
      return await meta.getTokenContract({ from: accounts[0] });
     })*/
      .then(function (instance) {
        meta = instance;
        return meta.addMintable(accounts[1], { from: accounts[0] });
      })
      .then(function () {
        return meta.getTokenContract({ from: accounts[0] });
      })
      .then(function (tokenAddress) {
        return Erc20.at(tokenAddress);
      })
     /* .then(async (token) => {
        tokenContract = token;
        await tokenContract.mint(1000, { from: accounts[1] });
        return await tokenContract.balanceOf(accounts[1], { from: accounts[1] });
      })*/
      .then(function (token) {
        tokenContract = token;
        return tokenContract.mint(1000, { from: accounts[1] });
      })
      .then(function () {
        return tokenContract.balanceOf(accounts[1], { from: accounts[1] });
      })
      .then(balanceOf => {      
        console.log("balanceOf = " + balanceOf);  
        assert.equal(
          1000,
          balanceOf,
          "it should have 1000 tokens"
        );
      })
    );

 /* it("remove mintable", () =>  { 
        Intendence.deployed()
      .then(function (instance) {
        meta = instance;
        return meta.removeMintable(accounts[1], { from: accounts[0] })
      })
      .then(function () {
        return meta.getTokenContract({ from: accounts[0] })
      })
      .then(function (tokenAddress) {
        return Erc20.at(tokenAddress)
      })
      .then(async (token) => {
        tokenContract = token;
        return await truffleAssert.reverts(tokenContract.mint(1000, { from: accounts[1] }), "the sender must be minter");
      })
  });*/


    
 it("remove mintable", async function () { 
  Intendence.deployed()
    .then(function (instance) {
      meta = instance;
      return meta.removeMintable(accounts[1], { from: accounts[0] });
    })
    .then(function () {
      return meta.getTokenContract({ from: accounts[0] });
    })
    .then(function (tokenAddress) {
      return Erc20.at(tokenAddress);
    })
    .then(async function (token) {
      tokenContract = token;
       await truffleAssert.reverts(tokenContract.mint(1000, { from: accounts[1] }), null, "the sender must be minter");
    });

    
});

  it("adding payer", () => 
    Intendence.deployed()
  /*  .then(async (instance) => {
      meta = instance;
      await meta.addPayer(accounts[2], { from: accounts[0] });
      await meta.transfer(accounts[5], 1000, { from: accounts[2] });
      return await meta.getTokenContract({ from: accounts[0] });
    })*/
      .then(function (instance) {
        meta = instance;
        return meta.addPayer(accounts[2], { from: accounts[0] });
      })
      .then(function () {
        return meta.transfer(accounts[5], 1000, { from: accounts[2] });
      })
      .then(function () {
        return meta.getTokenContract({ from: accounts[0] });
      })
      .then(function (tokenAddress) {
        return Erc20.at(tokenAddress);
      })
      .then(function (token) {
        tokenContract = token;
        return tokenContract.balanceOf(accounts[5], { from: accounts[1] });
      })
      .then(balanceOf => {
        console.log("balanceOf payer = " + balanceOf); 
        assert.equal(
          1000,
          balanceOf,
          "it should have 1000 tokens"
        );
      })
    );


    it("remove payer", async function () { 
      Intendence.deployed()
        .then(async function (instance) {
          meta = instance;
          return meta.removePayer(accounts[2], { from: accounts[0] });
        })
        .then(async function () {
           await truffleAssert.reverts(meta.transfer(accounts[5], 1000, { from: accounts[2] }), null, "the sender mast be a payer");
        });
     
    });



});
