//const recyclables = artifacts.require("./contracts/recyclables.sol");  //Ver esto
const recyclables = artifacts.require("Recyclables");
const truffleAssert = require('truffle-assertions');


contract("Recyclables", accounts => {
  var meta;
  var recyclableoOneCreator = accounts[0];

/*  it("getAmountRecyclables with no length 0", () => 
    recyclables.deployed()
      .then(function (instance) {
        meta = instance;
        return meta.getAmountRecyclables({ from: recyclableoOneCreator });
      })
      .then(amount => {
        assert.equal(
          0,
          amount,
          "the length should be 0"
        );
      })
    );*/

  it("adding recyclable and checking its availability", () =>  
    recyclables.deployed()
    /*.then(async (instance) => {
      meta = instance;
      await meta.add(1, { from: recyclableoOneCreator });
      return await meta.isAvailable(1, { from: recyclableoOneCreator });
    })*/
      .then(function (instance) {
        meta = instance;
        return meta.add(1, { from: recyclableoOneCreator });
      })
      .then(function () {
        return meta.isAvailable(1, { from: recyclableoOneCreator });
      })
      .then(isAvailable => {
        assert.equal(
          true,
          isAvailable,
          "the recyclable should be available"
        );
      })
    );

it("adding using to recyclable, checking its availability", () =>  
    recyclables.deployed()
   /* .then(async (instance) => {
      meta = instance;
      await meta.addUserToRecyclable(1, { from: recyclableoOneCreator });
      return await meta.isAvailable(1, { from: recyclableoOneCreator });
    })*/
      .then(function (instance) {
        meta = instance;
        return meta.addUserToRecyclable(1, { from: recyclableoOneCreator });
      })
      .then(function () {
        return meta.isAvailable(1, { from: recyclableoOneCreator });
      })
      .then(isAvailable => {
        assert.equal(
          false,
          isAvailable,
          "the recyclable should be unavailable"
        );
      })
    );


  it("useing recyclable one and checking its availability", () =>  
    recyclables.deployed()
   /* .then(async (instance) => {
      meta = instance;
      await meta.useRecyclable(recyclableoOneCreator, 1, { from: recyclableoOneCreator });
      return await meta.isAvailable(1, { from: recyclableoOneCreator });
    })*/
     .then(function (instance) {
        meta = instance;
        return meta.useRecyclable(recyclableoOneCreator, 1, { from: recyclableoOneCreator });
      })
      .then(function () {
        return meta.isAvailable(1, { from: recyclableoOneCreator });
      })
      .then(isAvailable => {
        assert.equal(
          true,
          isAvailable,
          "the recyclable should be available"
        );
      })
    );

  it("getting available recyclables", () =>  
    recyclables.deployed()
      .then(function (instance) {
        meta = instance;
        return meta.getAvailableRecyclables({ from: accounts[0] });
      })
      .then(recyclables => {
        assert.equal(
          1,
          recyclables[0],
          "the recyclable number 1 should be available"
        );
      })
    );


  it("adding other recyclable and getting all available recyclables", () =>  
    recyclables.deployed()
  /*  .then(async (instance) => {
      meta = instance;
      await meta.add(2, { from: recyclableoOneCreator });
      return await meta.getAvailableRecyclables({ from: accounts[0] });
    })*/
      .then(function (instance) {
        meta = instance;
        return meta.add(2, { from: recyclableoOneCreator });
      })
      .then(function () {
        return meta.getAvailableRecyclables({ from: accounts[0] });
      })
      .then(recyclables => {
        assert.equal(
          1,
          recyclables[0],
          "the recyclable number 1 should be available"
        );

        assert.equal(
          2,
          recyclables[1],
          "the recyclable number 1 should be available"
        );

        assert.equal(
          2,
          recyclables.length,
          "there should be 2 recyclables"
        );
      })
    );


  it("Removing recyclable and getting all recyclabes again, should not appear", () =>  
    recyclables.deployed()
  /*  .then(async (instance) => {
      meta = instance;
      await meta.remove(2, { from: recyclableoOneCreator });
      return await meta.getAvailableRecyclables({ from: accounts[0] });
    }) */
      .then(function (instance) {
        meta = instance;
        return meta.remove(2, { from: recyclableoOneCreator });
      })
      .then(function () {
        return meta.getAvailableRecyclables({ from: accounts[0] });
      })
      .then(recyclables => {
        assert.equal(
          1,
          recyclables[0],
          "the recyclable number 1 should be available"
        );
        assert.equal(
          1,
          recyclables.length,
          "there should be 1 recyclables"
        );
      })
    );


  it("useing recyclable number one, and getting all available recyclables, should be empty", () =>  
    recyclables.deployed()
 /*   .then(async (instance) => {
      meta = instance;
      await meta.addUserToRecyclable(1, { from: recyclableoOneCreator });
      return await meta.getAvailableRecyclables({ from: accounts[0] });
    })*/
      .then(function (instance) {
        meta = instance;
        return meta.addUserToRecyclable(1, { from: recyclableoOneCreator });
      })
      .then(function () {
        return meta.getAvailableRecyclables({ from: accounts[0] });
      })
      .then(recyclables => {
        assert.equal(
          0,
          recyclables.length,
          "there should be 0 recyclables"
        );
      })
    );

  it("getOwnerByRecyclable of account 3", () =>  
    recyclables.deployed()
   /* .then(async (instance) => {
      meta = instance;
      await meta.add(54645646, { from: accounts[0] });
      await meta.addUserToRecyclable(54645646, { from: accounts[3] });
      return await meta.getOwnerByRecyclable(54645646, { from: accounts[7] });
    })*/
      .then(function (instance) {
        meta = instance;
        return meta.add(54645646, { from: accounts[0] });
      })
      .then(function () {
        return meta.addUserToRecyclable(54645646, { from: accounts[3] });
      })
      .then(function () {
        return meta.getOwnerByRecyclable(54645646, { from: accounts[7] });
      })
      .then(owner => {
        assert.equal(
          accounts[3],
          owner,
          "there should be account 3"
        );
      })
    );


  it("getRecyclablesByOwner", () =>  
    recyclables.deployed()
   /* .then(async (instance) => {
      meta = instance;
      await meta.add(32133312, { from: accounts[0] });
      await meta.addUserToRecyclable(32133312, { from: accounts[6] });
      return await meta.getRecyclablesByOwner(accounts[6], { from: accounts[6] });
    })*/
      .then(function (instance) {
        meta = instance;
        return meta.add(32133312, { from: accounts[0] });
      })
      .then(function () {
        return meta.addUserToRecyclable(32133312, { from: accounts[6] });
      })
      .then(function () {
        return meta.getRecyclablesByOwner(accounts[6], { from: accounts[6] });
      })
      .then(result => {
        assert.equal(
          1,
          result.length,
          "there should be 1 recyclables"
        );
      })
    );

  it("useing the privous recyclable and getRecyclablesByOwner, should be 0", () =>  
    recyclables.deployed()
   /* .then(async (instance) => {
      meta = instance;
      await meta.useRecyclable(accounts[6], 32133312, { from: accounts[6] });
      return await meta.getRecyclablesByOwner(accounts[6], { from: accounts[6] });
    })*/
      .then(function (instance) {
        meta = instance;
        return meta.useRecyclable(accounts[6], 32133312, { from: accounts[6] });
      })
      .then(function () {
        return meta.getRecyclablesByOwner(accounts[6], { from: accounts[6] });
      })
      .then(result => {
        assert.equal(
          0,
          result.length,
          "there should be 0 recyclables"
        );
      })
    );

  it("Removing in the middle recyclable", () =>  
    recyclables.deployed()
  /*  .then(async (instance) => {
      meta = instance;
      await meta.add(10, { from: recyclableoOneCreator });
      await meta.add(11, { from: recyclableoOneCreator });
      await meta.add(12, { from: recyclableoOneCreator });
      await meta.remove(11, { from: accounts[0] });
      return await meta.getAvailableRecyclables({ from: accounts[0] });
    })*/
     .then(function (instance) {
        meta = instance;
        return meta.add(10, { from: recyclableoOneCreator });
      })
      .then(function (instance) {
        return meta.add(11, { from: recyclableoOneCreator });
      })
      .then(function (instance) {
        return meta.add(12, { from: recyclableoOneCreator });
      })
      .then(function () {
        return meta.remove(11, { from: accounts[0] });
      })
      .then(function () {
        return meta.getAvailableRecyclables({ from: accounts[0] });
      })
      .then(recyclables => {
        assert.equal(
          3,
          recyclables.length,
          "the recyclable number 1 should be available"
        );
        assert.equal(
          32133312,
          recyclables[0],
          "the recyclable number 32133312 "
        );
        assert.equal(
          10,
          recyclables[1],
          "the recyclable number 10 "
        );
        assert.equal(
          12,
          recyclables[2],
          "the recyclable number 12 "
        );
      })
    );


  it("get amount of recyclable", () =>  
    recyclables.deployed()
      .then(function (instance) {
        meta = instance;
        return meta.getAmountRecyclables({ from: recyclableoOneCreator });
      })
      .then(amount => {
        assert.equal(
          5,
          amount,
          "there should be in total 5 recyclables"
        );
      })
    );




   
  


  /* it("add user to unexistent recyclable", () => { 
    recyclables.deployed()
      .then(async (instance) => {
        meta = instance;
        return await truffleAssert.reverts(meta.addUserToRecyclable(99999, { from: accounts[0] }), "Recyclable does not exists");
      })
    });

  it("remove recyclable that does not exists", () =>
    recyclables.deployed()
      .then(function (instance) {
        meta = instance;
        return truffleAssert.reverts(meta.remove(99999, { from: accounts[0] }), "Recyclable does not exists");
      }));

  it("remove recyclable by someone not the owner of the contract", () => {
    recyclables.deployed()
      .then(async (instance) => {
        meta = instance;
        return await truffleAssert.reverts(meta.remove(12, { from: accounts[6] }), "Caller is not owner");
      })
    });

  it("adding recyclable by someone not the owner of the contract", () => { 
    recyclables.deployed()
      .then(async (instance) =>{
        meta = instance;
        return await truffleAssert.reverts(meta.add(123456, { from: accounts[6] }), "Caller is not owner");
      })
    });

  it("adding recyclable with an id that already exists", () => { 
    recyclables.deployed()
      .then(async (instance) => {
        meta = instance;
        return await truffleAssert.reverts(meta.add(12, { from: accounts[0] }), "The bottle already exists");
      })
    });

  it("use recyclable bot not being the owner", () => { 
    recyclables.deployed()
      .then(async (instance) => {
        meta = instance;
        return await truffleAssert.reverts(meta.useRecyclable(accounts[2], 12, { from: accounts[0] }), "Caller is not the Recyclable owner");
      })
    });

  it("adding user to recyclable not available", () => {
    recyclables.deployed()
      .then(function (instance) {
        meta = instance;
        return meta.addUserToRecyclable(10, { from: accounts[0] })
          .then(async () => {
            return truffleAssert.reverts(meta.addUserToRecyclable(10, { from: accounts[6] }), "the Recyclable is not available");
          });
      })
    });*/


    it("adding user to recyclable not available", async function () {
      //await deployTestModule()
      recyclables.deployed()
         .then( function (instance) {
             meta1 = instance;
             return meta1.addUserToRecyclable(10, { from: accounts[0] });
            })
             .then(async function () {
                await truffleAssert.reverts(meta1.addUserToRecyclable(10, { from: accounts[6] }), null, "the Recyclable is not available");
             });
         
         
     }); 
    
});