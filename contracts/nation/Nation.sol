pragma solidity ^0.4.18;

import "./NationStorage.sol";
import "../common/Initializable.sol";

/**
 * @title Nation
 * @dev Base Nation contract that acts as a nation registry for BitNation
 * Upgrade by calling nationImplementation.upgradeNation(upgradedImplementation.address)
 */
contract Nation is NationStorage, Initializable {

    struct NationCore {

        uint nationId;
        string nationName;
        string nationDescription;

        bool exists;
        bool virtualNation;
        address founder;

    }

    struct NationPolicy {

        string nationCode;
        string nationCodeLink;
        string lawEnforcementMechanism;
        bool hasConstitution;
        string constitutionLink;
        bool profit;

    }

    struct NationGovernance {

        bool nonCitizenUse;
        bool diplomaticRecognition;
        string decisionMakingProcess;
        string governanceService;

    }

    // Mapping for nationId => mapping of address to true if citizen exists
    mapping (uint => mapping (address => bool)) citizensMapping;
    // Mapping for nationId => numCitizens
    mapping (uint => uint) numCitizensMapping;

    // @dev mappings for nation id => nation properties
    mapping (uint => NationCore) nationCoreMapping;
    mapping (uint => NationPolicy) nationPolicyMapping;
    mapping (uint => NationGovernance) nationGovernanceMapping;
    mapping (uint => string) nationIds;
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
    // Events for when a nation's properties have been altered/created
    event NationCoreCreated(address indexed founder, string nationName, uint indexed nationId);
    event NationPolicySet(string nationName, uint indexed nationId);
    event NationGovernanceSet(string nationName, uint indexed nationId);
    // Events for citizens
    event CitizenJoined(uint indexed nationId, address citizenAddress);
    event CitizenLeft(uint indexed nationId, address citizenAddress);

    // Constructor for the nations contract. Sets the nations version as 1
    function Nation() public {
        NationCoreVersion = 1;
    }

    /**
     * @dev Initialize the Nation contract after it has been deployed.
     * @param _owner address representing the owner that can upgrade this contract.
     */
    function initialize(address _owner) onlyInit public {
        initialized();
        owner = _owner;
    }

    /**
    * @dev Changes the owner of this contract
    * @param _newOwner Address for new owner
    */
    function changeOwner(address _newOwner) external {
        require(msg.sender == owner);
        owner = _newOwner;
        OwnerChanged(_newOwner);
    }

    /**
     * @dev Get a nation's name using the nation id
     * @param _nationId uint the id of the nation that you want the name of.
     * @return An string that is the nation name.
     */
    function getNationName(uint _nationId) public constant returns (string) {
        return nationIds[_nationId];
    }

    /**
     * @dev Get a nation's core properties using the nation id
     * @param _nationId uint the id of the nation that you want the properties of.
     * @return A NationCore that corresponds to the nation id.
     */
    function getNationCore(uint _nationId) public constant returns (
        string _nationName,
        string _nationDescription,
        bool _exists,
        bool _virtualNation,
        address _founder
    ){

        NationCore memory nationCore = nationCoreMapping[_nationId];

        _nationName = nationCore.nationName;
        _nationDescription = nationCore.nationDescription;
        _exists = nationCore.exists;
        _virtualNation = nationCore.virtualNation;
        _founder = nationCore.founder;

    }

    /**
     * @dev Get a nation's policies using the nation id
     * @param _nationId uint the id of the nation that you want the policies of.
     * @return A NationPolicy that corresponds to the nation id.
     */
    function getNationPolicy(uint _nationId) public constant returns (
        string _nationCode,
        string _nationCodeLink,
        string _lawEnforcementMechanism,
        bool _hasConstitution,
        string _constitutionLink,
        bool _profit
    ) {

        NationPolicy memory nationPolicy = nationPolicyMapping[_nationId];

        _nationCode = nationPolicy.nationCode;
        _nationCodeLink = nationPolicy.nationCodeLink;
        _lawEnforcementMechanism = nationPolicy.lawEnforcementMechanism;
        _hasConstitution = nationPolicy.hasConstitution;
        _constitutionLink = nationPolicy.constitutionLink;
        _profit = nationPolicy.profit;

    }

    /**
     * @dev Get a nation's governance model using the nation id
     * @param _nationId uint the id of the nation that you want the governance model of.
     * @return A NationGovernance that corresponds to the nation id.
     */
    function getNationGovernance(uint _nationId) public constant returns (
        string _decisionMakingProcess,
        bool _diplomaticRecognition,
        string _governanceService,
        bool _nonCitizenUse
    ) {

        NationGovernance memory nationGovernance = nationGovernanceMapping[_nationId];

        _decisionMakingProcess = nationGovernance.decisionMakingProcess;
        _diplomaticRecognition = nationGovernance.diplomaticRecognition;
        _governanceService = nationGovernance.governanceService;
        _nonCitizenUse = nationGovernance.nonCitizenUse;
    }

    /**
     * @dev Create a nation by providing the core properties of that nation.
     * Additional properties (policies, governance) can be set at a later time.
     * @param _nationName string the name of the nation.
     * @param _nationDescription string the description of the nation.
     * @param _exists bool whether the nation is a real one or not.
     * @param _virtualNation bool if the nation is a virtual one.
     */
    function createNationCore(string _nationName, string _nationDescription, bool _exists, bool _virtualNation) external {

        require(bytes(_nationName).length > 0);

        numNations++;

        nationCoreMapping[numNations] = NationCore({
            nationId: numNations,
            nationName: _nationName,
            nationDescription: _nationDescription,
            exists: _exists,
            virtualNation: _virtualNation,
            founder: msg.sender
        });

        nationIds[numNations] = _nationName;

        foundedNations[msg.sender].push(numNations);

        NationCoreCreated(msg.sender, _nationName, numNations);

    }

    /**
     * @dev Set a nation's policies. Can only be set by the original founder of the nation.
     * @param _nationId uint the id of the nation.
     */
    function SetNationPolicy (
        uint _nationId,
        string _nationCode,
        string _nationCodeLink,
        string _lawEnforcementMechanism,
        bool _hasConstitution,
        string _constitutionLink,
        bool _profit
    ) public {

        require(_nationId > 0);
        require(nationCoreMapping[_nationId].nationId > 0);
        require(nationCoreMapping[_nationId].founder == msg.sender);

        nationPolicyMapping[_nationId] = NationPolicy({
            nationCode: _nationCode,
            nationCodeLink: _nationCodeLink,
            lawEnforcementMechanism: _lawEnforcementMechanism,
            hasConstitution: _hasConstitution,
            constitutionLink: _constitutionLink,profit: _profit
        });

        NationPolicySet(nationIds[_nationId], _nationId);

    }

    /**
     * @dev Set a nation's governance model. Can only be set by the original founder of the nation.
     * @param _nationId uint the id of the nation.
     */
    function SetNationGovernance (
        uint _nationId,
        string _decisionMakingProcess,
        bool _diplomaticRecognition,
        string _governanceService,
        bool _nonCitizenUse
    ) public {
        require(_nationId > 0);
        require(nationCoreMapping[_nationId].nationId > 0);
        require(nationCoreMapping[_nationId].founder == msg.sender);

        nationGovernanceMapping[_nationId] = NationGovernance({
            decisionMakingProcess: _decisionMakingProcess,
            diplomaticRecognition: _diplomaticRecognition,
            governanceService: _governanceService,
            nonCitizenUse: _nonCitizenUse
        });

        NationGovernanceSet(nationIds[_nationId], _nationId);
    }

    /**
    * @dev Changes nation implementation reference to a new address
    * @notice Upgrade nation to new implementation at address `_newNation` (CRITICAL!)
    * @param _newNation Address for new nation code
    */
    function upgradeNation(address _newNation) external {
        require(msg.sender == owner);
        nationImpl = _newNation;
        UpgradeNation(_newNation);
    }

    /**
    * @dev Adds a user to a nation's citizen registry
    * @param _nationId id of the nation that the citizen wants to join
    */
    function joinNation(uint _nationId) public {
        // Make sure the nation exists first
        require(_nationId > 0);
        require(nationCoreMapping[_nationId].nationId > 0);
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
    * @param _nationId id of the nation that the citizen wants to leave
    */
    function leaveNation(uint _nationId) public {
        // Make sure the nation exists first
        require(_nationId > 0);
        require(nationCoreMapping[_nationId].nationId > 0);
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
    * @param _citizenAddress address of the citizen you want to check
    * @param _nationId id of the nation that is being checked
    */
    function checkCitizen(address _citizenAddress, uint _nationId) public constant returns (bool) {
        return citizensMapping[_nationId][_citizenAddress];
    }

    /**
    * @dev Checks the number of citizens in a nation
    * @param _nationId id of the nation that is being checked
    */
    function getNumCitizens(uint _nationId) public constant returns (uint) {
        return numCitizensMapping[_nationId];
    }

    /**
    * @dev Gets an array of the nation ids that a founder has created
    * @param _founder address of the founder that is being searched
    */
    function getFoundedNations(address _founder) public constant returns (uint[]) {
        return foundedNations[_founder];
    }

}



