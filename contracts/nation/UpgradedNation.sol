pragma solidity 0.4.18;

import "./Nation.sol";

contract UpgradedNation is Nation {

    function isUpgraded() public pure returns (bool) {
        return true;
    }

}



