// This was based a AragonOS' proxy system modified by William
// Distributed under the GPL 3.0 license

pragma solidity ^0.4.18;

import "./NationStorage.sol";
import "../common/DelegateProxy.sol";

/**
 * @title NationProxy
 * @dev The proxy contract that forwards all function calls to the nation
 * Implementation that is currently being used
 */
contract NationProxy is NationStorage, DelegateProxy {

    // This is a proxy contract to a nation implementation. The implementation can
    // Update the reference, which upgrades the contract

    function NationProxy(address _nationImpl) public {
        nationImpl = _nationImpl;
    }

    // All calls made to the proxy are forwarded to the nation implementation via a delegatecall
    function () payable public {
        delegatedFwd(nationImpl, msg.data);
    }

}
