// let Nation = artifacts.require('./Nation.sol');
// let NationProxy = artifacts.require('./NationProxy.sol');
//
// contract('Nation Policy Exception Testing', accounts => {
//
// 	let nationInstance;
//
// 	before(async () => {
// 		let nationImpl = await Nation.new({from: accounts[0]});
// 		let nationProxy = await NationProxy.new(nationImpl.address, {from: accounts[0]});
// 		nationInstance = Nation.at(nationProxy.address, {from: accounts[0]});
// 		nationInstance.initialize(accounts[0]);
// 		nationInstance.createNationCore("USA", "United states of America", true, false)
// 	});
//
// 	it("Should be able to fail to set a non-existing nation's policies", function() {
// 		return nationInstance.SetNationPolicy(2, "nation code", "nationcodelink", "lawEM", true, {from: accounts[1]})
// 			.then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// 	it("Should be able to fail to set a nation's policies because not founder", function() {
// 		return nationInstance.SetNationPolicy(1, "nation code", "nationcodelink", "lawEM", true, {from: accounts[1]})
// 			.then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// 	it('Should fail to set a nations policy twice', function() {
// 		return nationInstance.SetNationPolicy(1, "nation code", "nationcodelink", "lawEM", true, {from: accounts[0]})
// 			.then(function(txReceipt) {
// 				return nationInstance.SetNationPolicy(1, "nation code 2", "nationcodelink2", "lawEM2", true, {from: accounts[0]});
// 			})
// 			.then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	})
//
// });
