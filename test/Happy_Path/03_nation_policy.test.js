// let Nation = artifacts.require('./Nation.sol');
// let NationProxy = artifacts.require('./NationProxy.sol');
//
// // Test to see if you can set a nation's policies
//
// contract('Nation Policy Testing', accounts => {
//
// 	let nationInstance;
//
// 	before(async () => {
// 		let nationImpl = await Nation.new({from: accounts[0]});
// 		let nationProxy = await NationProxy.new(nationImpl.address, {from: accounts[0]});
// 		nationInstance = Nation.at(nationProxy.address, {from: accounts[0]});
// 		nationInstance.initialize(accounts[0]);
// 	});
//
// 	it("Should be able to set a nation's policies", function() {
// 		return nationInstance.createNationCore("USA", "United states of America", true, false)
// 			.then(function(txReceipt) {
// 				return nationInstance.SetNationPolicy(1, "1", "nationcodelink", "lawEM", true)
// 			}).then(function (txReceipt) {
// 				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
// 				assert.equal(txReceipt.logs[0].event, "NationPolicySet", "event emitted should have been NationPolicySet");
// 			})
// 	});
//
// 	it("Should be able to get a nation's policies", function() {
// 		return nationInstance.getNationPolicy(1)
// 			.then(function (policies) {
// 				assert.equal(policies[0], "nation code", "Nation code should have been 'nation code'");
// 				assert.equal(policies[1], "nationcodelink", "Nation code link should have been 'nationcodelink'");
// 			});
// 	})
//
// });
