// SPDX-License-Identifier: ORT
pragma solidity =0.6.9;
import "./Owner.sol";
import "./SafeMath.sol";

//add  safeMath library
//ahy un tema con el borrar; se puede hacer de 2 formas, una forma es que no se borre nada y una vez que se registra el qr queda en la blockchain. Esta solucion en tiempos de consulta es O(1)
//la segunda forma es agregare al Struct Recyclable un atributo id, el tema de esta solucion es O(n)
contract Recyclables is Owner  {
    
    struct Recyclable{
         address owner;
         bool available;
         uint id;
    }
    
    using SafeMath for uint;

    Recyclable[] private _recyclables;
    uint[] private availableRecyclables; 

    mapping (uint => address) private RecyclableToOwner;
    mapping (address => uint) private ownerRecyclableCount;
    mapping (uint => uint) private indexes;
    uint private availableRecyclablesCount = 0;
    
    uint private lastIndex = 0;
    
   
    modifier isOwnerRecyclable(address _owner, uint _id) {
        uint index = indexes[_id];
        require(RecyclableToOwner[index] == _owner, "Caller is not the Recyclable owner");
        _;
    }
    
    modifier RecyclableExists(uint _idRecyclable) {
        require(indexes[_idRecyclable] > 0, "Recyclable does not exists");
        _;
    }

    constructor()public{}
    
    /**
     * @dev Deletes the Recyclable from the array, uses the [delete] keyword. It also affects
     * the RecyclableToOwner mapping as well as the ownerRecyclableCount mapping.
     *
     * Requirements:
     * - `_idRecyclable` musst exists.
     */
    function remove(uint _idRecyclable) public RecyclableExists(_idRecyclable) isOwner {
        uint index = indexes[_idRecyclable];
        Recyclable memory recyclable = _recyclables[index];
        bool isLastElement = index == _recyclables.length.sub(1);
        if(isLastElement){
          _removeLastCell(_idRecyclable, recyclable);
        }
        if(!isLastElement){
          _removeInTheMiddleCell(_idRecyclable, recyclable);
        }
        availableRecyclablesCount = availableRecyclablesCount.sub(1);
    }

    /**
     * @dev Creates a new Recyclable and adds it to the _recyclables array. Index 0 is not used.
     *
     * Requirements:
     * - `sender` must be the owner of this contract
     *
     * Returns:
     * - The id of the new Recyclable
     */
    function add(uint id) public isOwner {
        require(indexes[id] == 0, "The bottle already exists" );
        _add(id);
    }    
   
    /**
     * @dev Associates the sender with a Recyclables.
     *
     * Requirements:
     * - `_idRecyclable` must exists
     * - `_idRecyclable` must be available
     *
     */
    function addUserToRecyclable(uint _idRecyclable) public RecyclableExists(_idRecyclable){
        uint id = indexes[_idRecyclable];
        require(_recyclables[id].available, "the Recyclable is not available");
        _recyclables[id] = Recyclable(msg.sender,false,_idRecyclable);
        RecyclableToOwner[id] = msg.sender;
        ownerRecyclableCount[msg.sender] = ownerRecyclableCount[msg.sender].add(1);
        availableRecyclablesCount = availableRecyclablesCount.sub(1);
    }
    
    /**
     * @dev It sets available = true to the given `_idRecyclable`, sets the owner to 0x0 address, 
     * and finally it updates the ownerRecyclableCount mapping.
     *
     * Requirements:
     * - `_idRecyclable` must be owned by `_owner`
     * - `_idRecyclable` must exists
     *
     */
    function useRecyclable(address _owner, uint _idRecyclable) public RecyclableExists(_idRecyclable) isOwnerRecyclable(_owner, _idRecyclable){
        uint id = indexes[_idRecyclable];
        RecyclableToOwner[id] = address(0x0);
        _recyclables[id].owner = address(0x0);
        _recyclables[id].available = true;
        ownerRecyclableCount[_owner] = ownerRecyclableCount[_owner].sub(1);
        availableRecyclablesCount = availableRecyclablesCount.add(1);
    }
   
    /**
     * @dev Returns if `_idRecyclable` is available
     *
     * Requirements:
     * - `_idRecyclable` must exists
     *
     * Returns:
     * -true if the `_idRecyclable` is available
     */
    function isAvailable(uint _idRecyclable) public view RecyclableExists(_idRecyclable)  returns(bool)  {
        uint id = indexes[_idRecyclable];
        return _recyclables[id].available;
    }
    
    
    //tratar de evitar llamar a esta function
    //Lo mas eficiente es eliminar una botella cuando se deja de usar.. Hablarlo con José
    /**
     * @dev Returns all of the Recyclables assigned to `_owner`
     */
    function getRecyclablesByOwner(address _owner) external view returns (uint[] memory){
        uint[] memory result = new uint[](ownerRecyclableCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < _recyclables.length; i++) {
          if (RecyclableToOwner[i] == _owner) {
            result[counter] = i;
            counter++;
          }
        }
        return result;
    }
    
    /**
     * @dev returns the owner of the given Recyclable
     *
     * Requirements:
     * - `_idRecyclable` must exists
     *
     * Returns:
     * -The owner of the `_idRecyclable
     */
    function getOwnerByRecyclable(uint _idRecyclable) public view RecyclableExists(_idRecyclable) returns (address){
        uint id = indexes[_idRecyclable];
        return RecyclableToOwner[id];
    }
    
    /**
     * @dev You get the total amount of Recyclables, it substract one becouse the 0 index is not used
     *
     * Returns:
     * -Total amount of Recyclables
     */
    function getAmountRecyclables() public view returns(uint){
        if(_recyclables.length == 0){
            return 0;
        }
        return _recyclables.length.sub(1);
    }
    
    
    
    
    function getAvailableRecyclables() public view isOwner returns (uint[] memory) {
        uint[] memory result = new uint[](availableRecyclablesCount);
        uint lastIndexResultArray = 0;
         for (uint i = 1; i < _recyclables.length; i++) {
              if(_recyclables[i].available){
                  result[lastIndexResultArray] =  _recyclables[i].id;
                  lastIndexResultArray = lastIndexResultArray.add(1);
              }
         }
         return result;
    }
    

    /**
     * @dev Creates a new Recyclable and adds it to the _recyclables array. Index 0 is not used.
     *
     * Returns:
     * - The id of the new Recyclable
     */
    function _add(uint id) private {
        if(_recyclables.length == 0){
            Recyclable memory recyclable = Recyclable(address(0x0),false, 0);
            _recyclables.push(recyclable);
        }
        Recyclable memory recyclable = Recyclable(address(0x0),true,id);
        _recyclables.push(recyclable);
        lastIndex = id;
        indexes[id] = _recyclables.length.sub(1);
        availableRecyclablesCount = availableRecyclablesCount.add(1);
    }

    /**
     * @dev Deletes the last element of the array
     *
     * Requirements:
     * - `_idRecyclable` must exists (should be greater than zero).
     * - the index of the _idRecyclable must be the same as the length of the Recyclables array - 1
     */
    function _removeLastCell(uint _idRecyclable, Recyclable memory _recyclable) private RecyclableExists(_idRecyclable) {
         uint index = indexes[_idRecyclable];
         require(index == _recyclables.length.sub(1));
         if(_recyclable.owner != address(0x0)){
             ownerRecyclableCount[_recyclable.owner] = ownerRecyclableCount[_recyclable.owner].sub(1);
             delete RecyclableToOwner[_idRecyclable];
         }
         _recyclables.pop();
    }
    
    /**
     * @dev Deletes an element in the middle of the Recyclable array. For that, it takes the
     * last cell and swap it's value with the one that wants to be deleted, after that 
     * it updates the ownerRecyclableCount mapping as well as the RecyclableToOwner and the indexes mapping.
     * Then it deletes the last element of the array
     *
     * Requirements:
     * - `_idRecyclable` must exists (should be greater than zero).
     * - the index of the _idRecyclable must be lower as the length of the Recyclables array - 1
     */
    function _removeInTheMiddleCell(uint _idRecyclable, Recyclable memory _recyclable) private RecyclableExists(_idRecyclable) {
        uint index = indexes[_idRecyclable];
        require(index < _recyclables.length.sub(1), "element is the last one");
        if (_recyclables.length > 1) {
            uint lastRecyclableId = _recyclables[_recyclables.length.sub(1)].id;
            _recyclables[index] = _recyclables[_recyclables.length.sub(1)];
            indexes[lastRecyclableId] = index;
        }
        if(_recyclable.owner != address(0x0)){
            ownerRecyclableCount[_recyclable.owner] = ownerRecyclableCount[_recyclable.owner].sub(1);
            delete RecyclableToOwner[_idRecyclable];
        }
        _recyclables.pop();
    }
    
    
 


    
    
}