pragma solidity ^0.4.18;

import "./Nation.sol";

/**
 * @title UpgradedNation
 * @dev Used for testing the Nation's upgradeability
 */
contract UpgradedNation is Nation {

    function isUpgraded() public pure returns (bool) {
        return true;
    }

}



