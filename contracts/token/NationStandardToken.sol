import "./StandardToken.sol";

pragma solidity ^0.4.18;

contract NationStandardToken is StandardToken {

    /* Public variables of the token */

    /*
        NOTE:
        The following variables are OPTIONAL vanities. One does not have to include them.
        They allow one to customise the token contract & in no way influences the core functionality.
        Some wallets/interfaces might not even bother to look at this information.
    */

    string public name;                   //Fancy name: eg Simon Bucks
    uint public nationId;                 //The id of the nation this token belongs to
    uint8 public decimals;                //How many decimals to show. ie. There could 1000 base units with 3 decimals. Meaning 0.980 SBX = 980 base units. It's like comparing 1 wei to 1 ether.
    string public symbol;                 //An identifier: eg SBX

    function NationStandardToken(
        uint _nationId,
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
    ) public {
        balances[msg.sender] = _initialAmount;               // Give the creator all initial tokens
        totalSupply = _initialAmount;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        nationId = _nationId;
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
    }

}
