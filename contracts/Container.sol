// SPDX-License-Identifier: ORT
pragma solidity =0.6.9;

import "./Owner.sol";
import "./Recyclables.sol";
import "./ERC20.sol";
import "./Intendence.sol";
import "./SafeMath.sol";

contract Container is Owner {
    struct Spot {
         address owner;
         uint256 timestamp;
         bool isActive;
    }
    
    Intendence private intendence;
    Recyclables private recyclables;
    string public name;
    mapping (address => uint256) private _tokensGenerated;
    mapping (address => uint256) private _recyclablesRecicled;
    mapping (address => bool) private _rewardables;
    mapping (string => Spot) private _spots;
    uint private amountToTransfer;
    uint private amountRecycled;
    using SafeMath for uint256;


    // checkear porque muchos contenedores van a tener el mismo address
    constructor(Intendence _intendence, Recyclables _recyclables, string memory _name) public { //I should check both, this contract and the token contract owners are the same
        require(_intendence.getOwner() == msg.sender,"only the token owner can deploy this contract");
        intendence = _intendence;
        recyclables = _recyclables;
        amountToTransfer = 10;       
        addRewardable(msg.sender);
        name = _name;
    }

    modifier isRewardable(){
        require(_rewardables[msg.sender], "sender must be rewardable");
        _;
    }
   

    function setAmountToTransfer(uint _amount) isOwner public {
        amountToTransfer = _amount;
    }
    
    
    //todavia hay que pensar como se van a enviar los tokens del contenedor a la cuenta del que metio la botella (bottleOwner)
    /**
     * @dev Sends the reward to the address assigned to the id bottle.
     * Requirements:
     *
     * - `sender` must be the owner of this contract.
     * - `this contract should have enough balance in order to send the tokens
     */
    function reward(uint _idRecyclable) isRewardable public{
        address recyclableOwner = recyclables.getOwnerByRecyclable(_idRecyclable);
        recyclables.useRecyclable(recyclableOwner,_idRecyclable);
        _transfer(recyclableOwner);
    }
    
    /**
     * @dev Sends the reward to the entity address specified to the id bottle.
     * Requirements:
     *
     * - `sender` must be the owner of this contract.
     * - `this contract should have enough balance in order to send the tokens
     */
    function rewardEntity(uint _idRecyclable, address _entityAddress) isRewardable public{
        address recyclableOwner = recyclables.getOwnerByRecyclable(_idRecyclable);
        recyclables.useRecyclable(recyclableOwner,_idRecyclable);
        _transfer(_entityAddress);
    }
    
    function getRecyclablesRecycled() public view returns(uint){
        return _recyclablesRecicled[msg.sender];
    }
    
    function getAmountTokensGenerated() public view returns(uint){
        return _tokensGenerated[msg.sender];
    }
    /**
     * @dev get the address of this contract
     */
    function getAddress() public view returns(address){
        return address(this);
    }

    function getIntendence() public view returns (Intendence){
        return intendence;
    }

    function getRecyclables() public view returns (Recyclables){
        return recyclables;
    }
    
    
    function addSpot(string memory _name) public isOwner {
        require(!_spots[_name].isActive, "The spot already exists");
        _spots[_name] = Spot(address(0x0),0,true);
    }
    
    function associateSpot(string memory _name) public {
        require(_spots[_name].isActive, "incorrect container");
        require(_spots[_name].owner != msg.sender, "the user is already associated");
        require(now > _spots[_name].timestamp + 1 minutes, "must wait 1 minute");
        _spots[_name].owner = msg.sender;
        _spots[_name].timestamp = now;
    }
    
    function rewardSpot(string memory _name) public isRewardable {
        require(_spots[_name].isActive, "incorrect container");
        address userAssociated = _spots[_name].owner;
        _transfer(userAssociated);
    }

    function getTotalAmountRecycled() public view returns(uint) {
        return amountRecycled;
    }

    function isContainerRestricted(string memory _name) public view returns(bool){
        require(_spots[_name].isActive, "incorrect container");
        return (now < _spots[_name].timestamp + 1 minutes);
    }
    
    function _transfer(address recyclableOwner) private {
        intendence.transfer(recyclableOwner,amountToTransfer);
        _tokensGenerated[recyclableOwner] = _tokensGenerated[recyclableOwner].add(amountToTransfer);
        _recyclablesRecicled[recyclableOwner] = _recyclablesRecicled[recyclableOwner].add(1);
        amountRecycled = amountRecycled.add(1);
    }

    function addRewardable(address newRewardable) public isOwner{
        _rewardables[newRewardable] = true;
    }
        
    
}