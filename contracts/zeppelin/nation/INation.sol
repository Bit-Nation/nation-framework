pragma solidity 0.4.18;

contract INation {

    function upgradeNation(address _newNation) external;

    // Some functions for testing
    function setNumber(uint _number) public;
    function getNumber() constant public returns (uint);

}