pragma solidity 0.4.18;

import "./INation.sol";
import "./NationStorage.sol";
import "../common/Initializable.sol";
import "../ownership/Ownable.sol";

contract Nation2 is INation, NationStorage, Ownable {

    uint public number;

    event UpgradeNation(address indexed newNation);

    /**
    * @dev Changes kernel implementation reference to a new address
    * @notice Upgrade kernel to new implementation at address `_newNation` (CRITICAL!)
    * @param _newNation Address for new kernel code
    */
    function upgradeNation(address _newNation) onlyOwner external {
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



