pragma solidity ^0.4.18;

import "./NationStorage.sol";
import "../common/Initializable.sol";

/**
 * @title Nation
 * @dev Base Nation contract that acts as a nation registry for BitNation
 * Upgrade by calling nationImplementation.upgradeNation(upgradedImplementation.address)
 */
contract Nation is NationStorage, Initializable {

    // Mapping for nationId => mapping of address to true if citizen exists
    mapping (uint => mapping (address => bool)) citizensMapping;
    // Mapping for nationId => numCitizens
    mapping (uint => uint) numCitizensMapping;

    // Mapping for nation and metadata
    mapping (uint => string) nationMetadata;
    mapping (address => uint[]) foundedNations;

    // @dev keep track of the contract properties
    uint public NationCoreVersion;
    uint public numNations;
    address public owner;


    // EVENTS

    // logged events:
    // The nations contract has been upgraded (!IMPORTANT)
    event UpgradeNation(address indexed newNation);
    // Event for changing the owner of this contract
    event OwnerChanged(address indexed newOwner);
    event NationCreated(address indexed founder, uint indexed nationId);
    // Events for citizens
    event CitizenJoined(uint indexed nationId, address citizenAddress);
    event CitizenLeft(uint indexed nationId, address citizenAddress);

    // Constructor for the nations contract. Sets the nations version as 1
    function Nation() public {
        NationCoreVersion = 1;
    }

    /**
     * @dev Initialize the Nation contract after it has been deployed.
     *  _owner address representing the owner that can upgrade this contract.
     */
    function initialize(address _owner) onlyInit public {
        initialized();
        owner = _owner;
    }

    /**
    * @dev Changes the owner of this contract
    *  _newOwner Address for new owner
    */
    function changeOwner(address _newOwner) external {
        require(msg.sender == owner);
        owner = _newOwner;
        OwnerChanged(_newOwner);
    }

    function createNation(string _metaData) external {

        require(bytes(_metaData).length > 0);

        numNations++;

        nationMetadata[numNations] = _metaData;

        foundedNations[msg.sender].push(numNations);

        NationCreated(msg.sender, numNations);

    }

    /**
    * @dev Changes nation implementation reference to a new address
    * @notice Upgrade nation to new implementation at address `_newNation` (CRITICAL!)
    *  _newNation Address for new nation code
    */
    function upgradeNation(address _newNation) external {
        require(msg.sender == owner);
        nationImpl = _newNation;
        UpgradeNation(_newNation);
    }

    /**
    * @dev Adds a user to a nation's citizen registry
    *  _nationId id of the nation that the citizen wants to join
    */
    function joinNation(uint _nationId) public {
        // Make sure the nation exists first
        require(_nationId > 0);
        require(bytes(nationMetadata[_nationId]).length > 0);
        // Make sure the user is not already part of the nation
        require(citizensMapping[_nationId][msg.sender] == false);
        // overflow check
        require(numCitizensMapping[_nationId] + 1 > numCitizensMapping[_nationId]);

        citizensMapping[_nationId][msg.sender] = true;
        numCitizensMapping[_nationId]++;

        CitizenJoined(_nationId, msg.sender);
    }

    /**
    * @dev Removes a user from a nation's citizen registry
    *  _nationId id of the nation that the citizen wants to leave
    */
    function leaveNation(uint _nationId) public {
        // Make sure the nation exists first
        require(_nationId > 0);
        require(bytes(nationMetadata[_nationId]).length > 0);
        // Must be already in the nation
        require(citizensMapping[_nationId][msg.sender] == true);
        // overflow check
        require(numCitizensMapping[_nationId] - 1 < numCitizensMapping[_nationId]);

        citizensMapping[_nationId][msg.sender] = false;
        numCitizensMapping[_nationId]--;

        CitizenLeft(_nationId, msg.sender);
    }

    /**
    * @dev Checks to see if an address is a member of a nation
    *  _citizenAddress address of the citizen you want to check
    *  _nationId id of the nation that is being checked
    */
    function checkCitizen(address _citizenAddress, uint _nationId) public constant returns (bool) {
        return citizensMapping[_nationId][_citizenAddress];
    }

    /**
    * @dev Checks the number of citizens in a nation
    *  _nationId id of the nation that is being checked
    */
    function getNumCitizens(uint _nationId) public constant returns (uint) {
        return numCitizensMapping[_nationId];
    }

    /**
    * @dev Gets an array of the nation ids that a founder has created
    *  _founder address of the founder that is being searched
    */
    function getFoundedNations(address _founder) public constant returns (uint[]) {
        return foundedNations[_founder];
    }

}



