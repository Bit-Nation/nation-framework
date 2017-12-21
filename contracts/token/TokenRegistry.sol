import "./NationStandardToken.sol";

pragma solidity 0.4.18;

contract TokenRegistry {

    mapping(string => address[]) tokens;

    event TokenCreated(address tokenAddress, string tokenName, string nationName);

    function createStandardToken(string _nationName, uint256 _initialAmount, string _name, uint8 _decimals, string _symbol) public returns (address) {

        NationStandardToken newToken = (new NationStandardToken(_nationName, _initialAmount, _name, _decimals, _symbol));
        tokens[_nationName].push(address(newToken));
        newToken.transfer(msg.sender, _initialAmount); //the factory will own the created tokens. You must transfer them.
        TokenCreated(address(newToken), _name, _nationName);
        return address(newToken);

    }

    function getTokensForNation(string _nationName) public constant returns (address[]) {
        return tokens[_nationName];
    }

}
