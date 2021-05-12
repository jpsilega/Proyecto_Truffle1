const Erc20 = artifacts.require("./contracts/ERC20");
var meta;


contract("Erc20", accounts => {
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  let contract;

  const owner = accounts[0];
  const minter = accounts[1];

  describe("Erc20 Iteraciones",  function () { 
  
  it("Getting the owner of the contract", () =>  
    
    Erc20.deployed()
      .then(instance => instance.getOwner.call({ from: accounts[0] }))
      .then(owner => {
        assert.equal(
          owner,
          accounts[0],
          "wrong owner"
        );
      })
    );

  it("checking 0 balance", () =>  
    Erc20.deployed()
      .then(instance => instance.balanceOf.call(accounts[0], { from: accounts[0] }))
      .then(balance => {
        assert.equal(
          balance,
          0,
          "the balance is not 0"
        );
      })
    );

  it("Adding minter", () => 

     Erc20.deployed()
     /*.then(async (instance) => {
      contract = instance;
      await contract.addMintable(minter, { from: owner });
      return await contract.isMinter({ from: minter });
      })*/
      .then(instance => {
        contract = instance;
        return contract.addMintable(minter, { from: owner })
      })
      .then(function () {
        return contract.isMinter({ from: minter })
      })
      .then(isMinter => {
        console.log("isMinter = " + isMinter);
        assert.equal(
          isMinter,
          true,
          "the address should be a minter, but is not"
        );
      })
  );

  it("minting 10 tokens for address 2", () => 
    /*const owner = accounts[0];
    const minter = accounts[1];*/

    Erc20.deployed()
    /*.then(async (instance) => {
      meta = instance;
      await meta.mint(10, { from: minter });
      return await meta.balanceOf.call(minter, { from: minter });
    })*/
      .then(function (instance) {
        meta = instance;
        return meta.mint(10, { from: minter });
      })
      .then(function () {
        return meta.balanceOf.call(minter, { from: minter });
      })
      .then(balance => {
        assert.equal(
          balance,
          10,
          "the balance is not 10 tokens"
        );
      })
    );

    
  });


});