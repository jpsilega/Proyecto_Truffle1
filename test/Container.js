const Container = artifacts.require("./contracts/Container");
const Intendence = artifacts.require("./contracts/Intendence");
const Erc20 = artifacts.require("./contracts/Erc20");
const Recyclable = artifacts.require("./contracts/Recyclables");
const truffleAssert = require('truffle-assertions');



var meta;
var recyclablesContract;
var account;
var account_1;
var account_2;
//let Container;


contract("Container", accounts => {
    account = accounts[0];
   
    console.log(accounts);
    
   /* function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
*/
    
    it("reward normal workflow test", () =>  
        
        Container.deployed()
            .then(async (instance) => {
                meta = instance;
                await meta.setAmountToTransfer(100, { from: account });
                return await meta.getIntendence.call({ from: account });
            })
          /*  .then(function (instance) {
                meta = instance;
                return meta.setAmountToTransfer(100, { from: account });
            })
            .then(function () {
                return meta.getIntendence.call({ from: account });
            })*/
            .then(function (intendence) {
                return Intendence.at(intendence);
            })
            .then(function (intendenceContract) {
                return intendenceContract.addPayer(Container.address, { from: account });
            })
            .then(function () {
                return meta.getRecyclables.call({ from: account });
            })
            .then(function (recyclable) {
                return Recyclable.at(recyclable);
            })
            .then(function (recyclablesContractResponse) {
                recyclablesContract = recyclablesContractResponse;
                return recyclablesContract.add(333, { from: account });
            })
            .then(function () {
                return recyclablesContract.addUserToRecyclable(333, { from: account });
            })
            .then(async () => {
                await meta.addRewardable(account, { from: account });
                await meta.reward(333, { from: account });
            })
           /* 
            .then(function () {
                return meta.addRewardable(account, { from: account });
            })
            .then(function () {
                return meta.reward(333, { from: account });
            })*/
            .then(function () {
                return meta.getIntendence({ from: account });
            })
            .then(function (intendence) {
                return Intendence.at(intendence);
            })
            .then(function (intendenceContract) {
                return intendenceContract.getTokenContract({ from: account });
            })
            .then(function (erc20) {
                return Erc20.at(erc20);
            })
            .then(function (erc20Contract) {
                return erc20Contract.balanceOf(account, { from: account });
            })
            .then(function (balance) {
                console.log("balance = " + balance);
                assert.equal(
                    100,
                    balance,
                    "wrong balance"
                );
            })
            
    );


    it("reward entity normal workflow test", () =>  
        Container.deployed()
        .then(async (instance) => {
            meta = instance;
            await meta.setAmountToTransfer(100, { from: account });
            return await meta.getIntendence.call({ from: account });
        })
          /*  .then(function (instance) {
                meta = instance;
                return meta.setAmountToTransfer(100, { from: account });
            })
            .then(function () {
                return meta.getIntendence.call({ from: account });
            })*/
            .then(function (intendence) {
                return Intendence.at(intendence);
            })
            .then(function () {
                return meta.getRecyclables.call({ from: account });
            })
            .then(function (recyclable) {
                return Recyclable.at(recyclable);
            })            
           .then(function (recyclablesContractResponse) {
                recyclablesContract = recyclablesContractResponse;
                return recyclablesContract.add(3213211, { from: account });
            })
            .then(function () {
                return recyclablesContract.addUserToRecyclable(3213211, { from: account });
            })            
            .then(function () {
                return meta.rewardEntity(3213211, accounts[8], { from: account });
            })
            .then(function () {
                return meta.getIntendence({ from: account });
            })
            .then(function (intendence) {
                return Intendence.at(intendence);
            })
            .then(function (intendenceContract) {
                return intendenceContract.getTokenContract({ from: account });
            })
            .then(function (erc20) {
                return Erc20.at(erc20);
            })
            .then(function (erc20Contract) {
                return erc20Contract.balanceOf(accounts[8], { from: account });
            })
            .then(function (balance) {
                console.log("balance = " + balance);
                assert.equal(
                    100,
                    balance,
                    "wrong balance"
                );
            })
    );

    it("get amount of token generated, should be 100", () =>  
        Container.deployed()
            .then(function (instance) {
                meta = instance;
                return meta.getAmountTokensGenerated({ from: account });
            })
            .then(function (amountGenerated) {
                console.log("amountGenerated = " + amountGenerated);
                assert.equal(
                    100,
                    amountGenerated,
                    "wrong balance"
                );
            })
        );

    it("getting the amount of recyclables recycled, should be 1", () =>  
        Container.deployed()
            .then(function (instance) {
                meta = instance;
                return meta.getRecyclablesRecycled({ from: account });
            })
            .then(function (amountRecycled) {
                console.log("amountRecycled = " + amountRecycled);
                assert.equal(
                    1,
                    amountRecycled,
                    "should have recycled 2 objects"
                );
            })
        );
    
        it("reward adding spot normal workflow test", () => 
            Container.deployed()
            .then(async (instance) => {
                meta = instance;
                console.log(meta.address);
                await meta.setAmountToTransfer(100, { from: account });
                await meta.addSpot("test", { from: account });
                await meta.associateSpot("test", { from: accounts[2]});
                await meta.rewardSpot("test", { from: account });
                
             })
               /* .then(function (instance) {
                    meta = instance;
                    return meta.setAmountToTransfer(100, { from: account });
                })
                .then(function () {
                    return meta.addSpot("test", { from: account });
                })
                .then(function () {
                    return meta.associateSpot("test", { from: accounts[2]});
                })
                .then(function () {
                    return meta.rewardSpot("test", { from: account });
                })*/
                .then(function () {
                    console.log(meta.address);
                    return meta.getIntendence({ from: account });
                })
                .then(function (intendence) {
                    return Intendence.at(intendence);
                })
                .then(function (intendenceContract) {
                    return intendenceContract.getTokenContract({ from: account });
                })
                .then(function (erc20) {
                    return Erc20.at(erc20);
                })
                .then(function (erc20Contract) {
                    return erc20Contract.balanceOf(accounts[2], { from: account });
                })
                .then(function (balance) {
                    console.log("Balance = " + balance);
                    assert.equal(
                        100,
                        balance,
                        "wrong balance"
                    );
                })
            );

    it("testing get address", () => 
        Container.deployed()
            .then(function (instance) {
                meta = instance;
                return meta.getAddress({ from: account });
            })
            .then(function (address) {
                assert.equal(
                    Container.address,
                    address,
                    "should be same address"
                );
            })
        );

    

     it("verify container restricted", () =>  
        Container.deployed()    
        .then(function () {
            return meta.isContainerRestricted("test", { from: account });
        })
        .then(function (container) {
            assert.equal(
                true,
                container,
                "wrong container restricted"
            );
        })
      );

      it("Calling get total amount of recyclables generated", () =>  
        Container.deployed()
        .then(function (instance) {
            return instance.getTotalAmountRecycled({ from: account });
        })
        .then(function (total) {
            assert.equal(
                3,
                total,
                "wrong total"
            );
        })
    );



    it("adding spot with already used name", async function () {   
        Container.deployed()       
         .then(async function (instance) {
               meta = instance;
            return meta.setAmountToTransfer(100, { from: account });      
            })
         .then( async function() {    
            await truffleAssert.reverts(meta.addSpot("test", { from: accounts[0] }), null, "The spot already exists");
           });       
           
            
        });
    

   



  /* it("adding spot with already used name", () => { 
        Container.deployed()
            .then(function (instance) {
                meta = instance;
                return meta.setAmountToTransfer(100, { from: account });
            })
            .then(async () => {
                return await truffleAssert.reverts(meta.addSpot("test", { from: accounts[0] }), "The spot already exists");
            })
   });

    it("Associating an already associated spot with the same account", () => { 
        Container.deployed()
            .then(async () => {
                return await truffleAssert.reverts(meta.associateSpot("test", { from: accounts[2] }), "the user is already associated");
            })
    });

    it("Associating an already associated spot with different account, should wait one minute!", () => { 
         Container.deployed()
            .then(async () => {
            return await truffleAssert.reverts(meta.associateSpot("test", { from: accounts[3] }), "must wait 1 minute");
            })
    });

    it("call rewardSpot function with un unexistent container", () => {  
         Container.deployed()
            .then(async () => {
                return await truffleAssert.reverts(meta.rewardSpot("test_unexistent", { from: accounts[0] }), "incorrect container");
            })
    });

    it("Associating unexistent container", () => {   
        Container.deployed()
            .then(async () => {
                return await truffleAssert.reverts(meta.associateSpot("test_unexistent", { from: accounts[0] }), "incorrect container");
            })
    });

    it("Calling reward function with no rewardable account", () => { 
        Container.deployed()
            .then(async () => {
                return await truffleAssert.reverts(meta.reward(333, { from: accounts[5]}), "sender must be rewardable");
            })
    });

    it("Calling rewardSpot function with no rewardable account",  () => { 
        Container.deployed()
            .then(async () => {
            return await truffleAssert.reverts(meta.rewardSpot("test", { from: accounts[5] }), "sender must be rewardable");
            })
    });


        it("Calling rewardEntity function with no rewardable account", () => { 
            Container.deployed()
            .then(async (instance) => {
                meta = instance;            
                return truffleAssert.reverts(meta.rewardEntity(123, accounts[1], { from: accounts[5] }), "sender must be rewardable");
            })
        });

    */


    
});