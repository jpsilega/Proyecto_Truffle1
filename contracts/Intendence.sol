// SPDX-License-Identifier: ORT
pragma solidity =0.6.9;
import "./Owner.sol";
import "./SafeMath.sol";
import "./ERC20.sol";


contract Intendence is Owner  {
   ERC20 private token;    
   mapping(address => bool) payers;
   
   modifier isPayer(){
       require(payers[msg.sender],"the sender mast be a payer");
       _;
   }
   
   constructor() public{
       token = new ERC20("ORT", "ORT");
   }

 
   
   function getTokenContract() public view returns (ERC20) {
       return token;
   }
   
   function transfer(address _to, uint _amount) public isPayer {
       if(token.balanceOf(address(this)) < _amount ){
           token.mint(_amount*100);
       }
       token.transfer(_to,_amount);
   }
   
   function addMintable(address _address) public isOwner{
       token.addMintable(_address);
   }
   
   function removeMintable(address _address) public isOwner{
       token.removeMintable(_address);
   }
   
   function addPayer(address _payer) public isOwner {
       require(!payers[_payer], "the address is already a payer");
       require(_payer != address(0x0), "the address can't be 0x0");
       payers[_payer] = true;
   }
   
   function removePayer(address _payer) public isOwner {
       require(payers[_payer], "the address is not a payer");
       require(_payer != address(0x0), "the address can't be 0x0");
       payers[_payer] = false;
   }
   
}