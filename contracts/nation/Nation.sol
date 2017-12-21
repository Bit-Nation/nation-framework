pragma solidity 0.4.18;

import "./NationStorage.sol";
import "../common/Initializable.sol";

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

    mapping (string => NationCore) nationCoreMapping;
    mapping (string => NationPolicy) nationPolicyMapping;
    mapping (string => NationGovernance) nationGovernanceMapping;
    mapping (uint => string) nationIds;

    uint public NationCoreVersion;
    uint public numNations;
    address public owner;

    event UpgradeNation(address indexed newNation);

    event NationCoreCreated(address indexed founder, string nationName, uint indexed nationId);
    event NationPolicySet(string nationName, uint indexed nationId);
    event NationGovernanceSet(string nationName, uint indexed nationId);

    // For debugging purposes
    event LogEvent(address sender, address owner);

    function Nation() public {
        NationCoreVersion = 3;
    }

    function initialize(address _owner) onlyInit public {
        initialized();
        owner = _owner;
    }

    function getNationId(string _nationName) public constant returns (uint) {
        return nationCoreMapping[_nationName].nationId;
    }

    function getNationName(uint _nationId) public constant returns (string) {
        return nationIds[_nationId];
    }

    function getNationCore(string _nationName) public constant returns (
        uint _nationId,
        string _nationDescription,
        bool _exists,
        bool _virtualNation,
        address _founder
    ){

        NationCore memory nationCore = nationCoreMapping[_nationName];

        _nationId = nationCore.nationId;
        _nationDescription = nationCore.nationDescription;
        _exists = nationCore.exists;
        _virtualNation = nationCore.virtualNation;
        _founder = nationCore.founder;

    }

    function getNationPolicy(string _nationName) public constant returns (
        string _nationCode,
        string _nationCodeLink,
        string _lawEnforcementMechanism,
        bool _hasConstitution,
        string _constitutionLink,
        bool _profit
    ) {

        NationPolicy memory nationPolicy = nationPolicyMapping[_nationName];

        _nationCode = nationPolicy.nationCode;
        _nationCodeLink = nationPolicy.nationCodeLink;
        _lawEnforcementMechanism = nationPolicy.lawEnforcementMechanism;
        _hasConstitution = nationPolicy.hasConstitution;
        _constitutionLink = nationPolicy.constitutionLink;
        _profit = nationPolicy.profit;

    }

    function getNationGovernance(string _nationName) public constant returns (
        string _decisionMakingProcess,
        bool _diplomaticRecognition,
        string _governanceService,
        bool _nonCitizenUse
    ) {

        NationGovernance memory nationGovernance = nationGovernanceMapping[_nationName];

        _decisionMakingProcess = nationGovernance.decisionMakingProcess;
        _diplomaticRecognition = nationGovernance.diplomaticRecognition;
        _governanceService = nationGovernance.governanceService;
        _nonCitizenUse = nationGovernance.nonCitizenUse;
    }

    function createNationCore(string _nationName, string _nationDescription, bool _exists, bool _virtualNation) external {

        require(bytes(_nationName).length > 0);
        require(nationCoreMapping[_nationName].nationId == 0);

        numNations++;

        nationCoreMapping[_nationName] = NationCore({
            nationId: numNations,
            nationName: _nationName,
            nationDescription: _nationDescription,
            exists: _exists,
            virtualNation: _virtualNation,
            founder: msg.sender
        });

        nationIds[numNations] = _nationName;

        NationCoreCreated(msg.sender, _nationName, numNations);

    }

    function SetNationPolicy (
        string _nationName,
        string _nationCode,
        string _nationCodeLink,
        string _lawEnforcementMechanism,
        bool _hasConstitution,
        string _constitutionLink,
        bool _profit
    ) public {

        require(bytes(_nationName).length > 0);
        require(nationCoreMapping[_nationName].nationId > 0);
        require(nationCoreMapping[_nationName].founder == msg.sender);

        nationPolicyMapping[_nationName] = NationPolicy({
            nationCode: _nationCode,
            nationCodeLink: _nationCodeLink,
            lawEnforcementMechanism: _lawEnforcementMechanism,
            hasConstitution: _hasConstitution,
            constitutionLink: _constitutionLink,profit: _profit
        });

        NationPolicySet(_nationName, nationCoreMapping[_nationName].nationId);

    }

    function SetNationGovernance (
        string _nationName,
        string _decisionMakingProcess,
        bool _diplomaticRecognition,
        string _governanceService,
        bool _nonCitizenUse
    ) public {
        require(bytes(_nationName).length > 0);
        require(nationCoreMapping[_nationName].nationId > 0);
        require(nationCoreMapping[_nationName].founder == msg.sender);

        nationGovernanceMapping[_nationName] = NationGovernance({
            decisionMakingProcess: _decisionMakingProcess,
            diplomaticRecognition: _diplomaticRecognition,
            governanceService: _governanceService,
            nonCitizenUse: _nonCitizenUse
        });

        NationGovernanceSet(_nationName, nationCoreMapping[_nationName].nationId);
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

}



