import "./NationStandardToken.sol";

pragma solidity ^0.4.18;

contract TokenRegistry {

    mapping(uint => address[]) tokens;

    event TokenCreated(address tokenAddress, string tokenName, uint indexed nationId);

    function createStandardToken(uint _nationId, uint256 _initialAmount, string _name, uint8 _decimals, string _symbol) public returns (address) {

        require(_nationId > 0 && _initialAmount > 0 && bytes(_name).length > 0 && bytes(_symbol).length > 0);

        NationStandardToken newToken = (new NationStandardToken(_nationId, _initialAmount, _name, _decimals, _symbol));
        tokens[_nationId].push(address(newToken));
        newToken.transfer(msg.sender, _initialAmount); //the factory will own the created tokens. You must transfer them.
        TokenCreated(address(newToken), _name, _nationId);
        return address(newToken);

    }

    function getTokensForNation(uint _nationId) public constant returns (address[]) {
        return tokens[_nationId];
    }

}
