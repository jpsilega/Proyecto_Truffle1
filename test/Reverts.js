const Container = artifacts.require("Container");
const Intendence = artifacts.require("Intendence");
//const Erc20 = artifacts.require("ERC20");
const recyclables = artifacts.require("Recyclables");

const truffleAssert = require('truffle-assertions');
//const Web3 = require('web3');


// Apply configuration
/*require('@openzeppelin/test-helpers/configure')(
  { 
    provider: 'http://10.20.32.48:8545',
  }
  );


const { expectRevert } = require('@openzeppelin/test-helpers');*/



var meta;
var meta1;
var meta4;
var recyclablesContract;
var account;

let container; 
//let intendence; 
let erc20; 
//let Recyclables; 

//let web3;
//const web3 = new Web3('http://10.20.32.48:8545');

let latestKnownBlockNumber = -1;
let blockTime = 500;

contract("Reverts", accounts => {

    account = accounts[0];    


    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }   

 

   async function processBlock(blockNumber) {
    console.log("We process block: " + blockNumber);
    let block = await web3.eth.getBlock(blockNumber);
    console.log("new block :", block)
    for (const transactionHash of block.transactions) {
        let transaction = await web3.eth.getTransaction(transactionHash);
        let transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
        transaction = Object.assign(transaction, transactionReceipt);
        console.log("Transaction: ", transaction);
        // Do whatever you want here
    }
    latestKnownBlockNumber = blockNumber;
}
   
   async function checkCurrentBlock() {
    const currentBlockNumber = await web3.eth.getBlockNumber()
    console.log("Current blockchain top: " + currentBlockNumber, " | Script is at: " + latestKnownBlockNumber);
    while (latestKnownBlockNumber == -1 || currentBlockNumber > latestKnownBlockNumber) {
        await processBlock(latestKnownBlockNumber == -1 ? currentBlockNumber : latestKnownBlockNumber + 1);
    }
    setTimeout(checkCurrentBlock, blockTime);
}


    
   /**Container Revert */

   describe("Assertion Revert: Container",  function () {     
  

 /*  it("adding spot with already used name", async function () {   
    Container.deployed()       
    // .then(async function (instance) {
       //    meta = instance;
      //  return meta.setAmountToTransfer(100, { from: account });      
      //  })
     //  .then( async function() {    
        await truffleAssert.reverts(meta.addSpot("test", { from: accounts[0] }), null, "The spot already exists");
       });       
       
        
    });*/

    

it("Associating an already associated spot with the same account", async function () { 
  
    Container.deployed()
    .then(async function (instance) {
    meta = instance;
     await truffleAssert.reverts(meta.associateSpot("test", { from: accounts[2] }), null, "the user is already associated");
   });    
  
   //done();
  
        
      
  });

it("Associating an already associated spot with different account, should wait one minute!", async function ()   {

    Container.deployed()
    .then(async function (instance) {
      meta = instance;
      
       await truffleAssert.reverts(meta.associateSpot("test", { from: accounts[3] }), null, "must wait 1 minute");
    });    
 
    //done();
   
        
   });

it("call rewardSpot function with un unexistent container", async function () { 
     Container.deployed()
        .then(async function (instance) {
          meta = instance;
           await truffleAssert.reverts(meta.rewardSpot("test_unexistent", { from: accounts[0] }), null, "incorrect container");
        });
        //done();
    });

it("Associating unexistent container", async function () {   
    Container.deployed()
        .then(async function (instance) {
          meta = instance;          
           await truffleAssert.reverts(meta.associateSpot("test_unexistent", { from: accounts[0] }), null, "incorrect container");
        });
       // done();
    });

it("Calling reward function with no rewardable account", async function () {
    Container.deployed()
        .then(async function (instance) {
          meta = instance;
           await truffleAssert.reverts(meta.reward(333, { from: accounts[5]}), null, "sender must be rewardable");
        });
       // done();
    });

it("Calling rewardSpot function with no rewardable account", async function () { 
    Container.deployed()
        .then(async function (instance) {
          meta = instance;
          console.log(meta.address);         
           await truffleAssert.reverts(meta.rewardSpot("test", { from: accounts[5] }), null, "sender must be rewardable");
        });     
       // done();
    });


    it("Calling rewardEntity function with no rewardable account", async function () {
        Container.deployed()
        .then(async function (instance) {
            meta = instance;            
            await truffleAssert.reverts(meta.rewardEntity(123, accounts[1], { from: accounts[5] }), null, "sender must be rewardable");
        });

       //done();
      });
      

  }); 


describe("Assertion Revert: Intendence",  function () {   
 
  it("adding payer that is already a payer", async function () { 
    Intendence.deployed()
        .then(async function (instance) {
          meta = instance;
          return meta.addPayer(accounts[2], { from: accounts[0] });
        })
       .then(async function () {
           await truffleAssert.reverts(meta.addPayer(accounts[2], { from: accounts[0] }), null, "the address is already a payer");
        });
       // done();
    }); 

 


  it("removing a payer that is not a payer", async function () { 
      Intendence.deployed()
        .then(async function (instance) {
          meta = instance;
           await truffleAssert.reverts(meta.removePayer(accounts[3], { from: accounts[0] }), null, "the address is not a payer");
        });
      //done();
   
    });



  it("Adding mintable not being the owner of the contract", async function () { 
    Intendence.deployed()
      .then( async function (instance) {
        meta = instance;
         await truffleAssert.reverts(meta.addMintable(accounts[3], { from: accounts[2] }), null, "Caller is not owner"); 
      });

     // done();
  });


  it("Adding payer not being the owner of the contract", async function () { 
    Intendence.deployed()
      .then(async function (instance) {
        meta = instance;
        await truffleAssert.reverts(meta.addPayer(accounts[3], { from: accounts[2] }), null, "Caller is not owner");
      });
    //  done();
      
  });

});



describe("Assertion Revert: Recyclables",  function () {

  

    
   
    it("add user to unexistent recyclable", async function () {
     // await deployTestModule() 
      recyclables.deployed()          
            .then(async function (instance) {
                meta1 = instance;  
                console.log(meta1.address);             
                await truffleAssert.reverts(meta1.addUserToRecyclable(99999, { from: accounts[0] }), null, "Recyclable does not exists");
           });
        // done();
     });
 
  
     it("remove recyclable that does not exists", async function () { 
      //await  deployTestModule()
       recyclables.deployed()
             .then(async function (instance) {
             meta1 = instance;      
             await truffleAssert.reverts(meta1.remove(99999, { from: accounts[0] }), null, "Recyclable does not exists");
         });
        
     });
 
 
    it("remove recyclable by someone not the owner of the contract", async function () {
      //await deployTestModule()
      recyclables.deployed()
         .then(async function (instance)  {
             meta1 = instance;
             await truffleAssert.reverts(meta1.remove(12, { from: accounts[6] }), null, "Caller is not owner");
         });
 
      // done();  
 
     });
 
 
     
    it("adding recyclable by someone not the owner of the contract", async function () { 
      //await deployTestModule()
       recyclables.deployed()
             .then(async function (instance) {
             meta1 = instance;
              await truffleAssert.reverts(meta1.add(123456, { from: accounts[6] }), null, "Caller is not owner");
         });  
        
     });
 
    it("adding recyclable with an id that already exists", async function () { 
      //await deployTestModule()
       recyclables.deployed()
         .then(async function (instance) {
             meta1 = instance;          
              await truffleAssert.reverts(meta1.add(12, { from: accounts[0] }), null, "The bottle already exists");        
         });
       // done();
     });
 
  it("use recyclable bot not being the owner", async function () { 
      //await deployTestModule()
       recyclables.deployed()
             .then(async function (instance)  {
             meta1 = instance;        
              await truffleAssert.reverts(meta1.useRecyclable(accounts[2], 12, { from: accounts[0] }), null, "Caller is not the Recyclable owner");
         
         });   
      // done();
     });    


});







});