const Nation = artifacts.require('Nation');
const UpgradedNation = artifacts.require('UpgradedNation');
const NationProxy = artifacts.require('NationProxy');

module.exports = function(deployer) {
	deployer.deploy(Nation).then(function() {
		deployer.deploy(NationProxy, Nation.address);
	});
	deployer.deploy(UpgradedNation);
};
