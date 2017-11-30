pragma solidity 0.4.18;

import "./INation.sol";
import "./NationStorage.sol";
import "../common/Initializable.sol";

contract Nation is INation, NationStorage {

    uint public number;

    event UpgradeNation(address indexed newNation);

    /**
    * @dev Changes kernel implementation reference to a new address
    * @notice Upgrade kernel to new implementation at address `_newNation` (CRITICAL!)
    * @param _newNation Address for new kernel code
    */
    function upgradeNation(address _newNation) external {
        nationImpl = _newNation;
        UpgradeNation(_newNation);
    }

    function setNumber(uint _number) public {
        number = _number;
    }

    function getNumber() public constant returns (uint) {
        return number;
    }

}



