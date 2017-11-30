pragma solidity 0.4.18;

import "./INation.sol";
import "./NationStorage.sol";
import "../common/Initializable.sol";

contract Nation is INation, NationStorage {

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
        string LawEnforcementMechanism;
        bool hasConstitution;
        string constitutionLink;
        string decisionMakingProcess;
        bool diplomaticRecognition;
        string[] governanceService;
        bool nonCitizenUse;
        bool profit;
        bool multiCitizenship;

    }

    mapping (string => NationCore) nationCoreMapping;
    mapping (uint => string) nationIds;

    uint public NationCoreVersion;
    uint public numNations;

    uint public number;

    event UpgradeNation(address indexed newNation);

    event NationCoreCreated(address indexed founder, string nationName, uint nationId);

    function Nation() public {
        NationCoreVersion = 3;
    }

    function getNationCore(string _nationName) public constant returns (uint _nationId, string _nationDescription, bool _exists, bool _virtualNation, address _founder){

        NationCore memory nationCore = nationCoreMapping[_nationName];

        _nationId = nationCore.nationId;
        _nationDescription = nationCore.nationDescription;
        _exists = nationCore.exists;
        _virtualNation = nationCore.virtualNation;
        _founder = nationCore.founder;

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

        NationCoreCreated(msg.sender, _nationName, numNations);

    }

    /**
    * @dev Changes nation implementation reference to a new address
    * @notice Upgrade nation to new implementation at address `_newNation` (CRITICAL!)
    * @param _newNation Address for new nation code
    */
    function upgradeNation(address _newNation) external {
        nationImpl = _newNation;
        UpgradeNation(_newNation);
    }


    // Temp testing functions

    function setNumber(uint _number) public {
        number = _number;
    }

    function getNumber() public constant returns (uint) {
        return number;
    }

}



