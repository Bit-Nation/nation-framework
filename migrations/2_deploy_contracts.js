var Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");

module.exports = function(deployer) {
	deployer.deploy(Ownable);
	deployer.link(Ownable);
};
