const Nation = artifacts.require('Nation');
const UpgradedNation = artifacts.require('UpgradedNation');
const NationProxy = artifacts.require('NationProxy');
const TokenRegistry = artifacts.require('TokenRegistry');

module.exports = function(deployer) {
	deployer.deploy(Nation).then(function() {
		deployer.deploy(NationProxy, Nation.address);
	});
	deployer.deploy(UpgradedNation);
	deployer.deploy(TokenRegistry);
};
