// let Nation = artifacts.require('./Nation.sol');
// let UpgradedNation = artifacts.require('./UpgradedNation.sol');
// let NationProxy = artifacts.require('./NationProxy.sol');
//
// // Test to see Nation upgrade failures
//
// contract('Nation Upgrade Exception Testing', accounts => {
//
// 	let nation = {};
// 	let nationProxy = {};
//
// 	before(async () => {
// 		const nationImpl = await Nation.new({from: accounts[0]});
// 		nationProxy = await NationProxy.new(nationImpl.address, {from: accounts[0]});
// 		nation = Nation.at(nationProxy.address, {from: accounts[0]});
// 		nation.initialize(accounts[0]);
// 	});
//
// 	it('fails to upgrade the nation because owner is wrong', function() {
//
// 		return UpgradedNation.new({from: accounts[0]}).then(function(upgradedImpl) {
// 			return nation.upgradeNation(upgradedImpl.address, {from: accounts[1]});
// 		}).then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// });