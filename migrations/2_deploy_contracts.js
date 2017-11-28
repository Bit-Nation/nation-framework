const Nation = artifacts.require('Nation');
const Nation2 = artifacts.require('Nation2');
const NationProxy = artifacts.require('NationProxy');

module.exports = function(deployer) {
	deployer.deploy(Nation).then(function() {
		deployer.deploy(NationProxy, Nation.address);
	});
	deployer.deploy(Nation2);
};
