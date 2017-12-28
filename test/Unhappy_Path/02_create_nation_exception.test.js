// let Nation = artifacts.require('./Nation.sol');
//
// Test no longer necessary since we are now with the id indexing
//
// contract('Nation Core Exception Testing', accounts => {
//
// 	it('Should fail to create a nation without a name', function() {
// 		let nationInstance;
// 		return Nation.deployed().then(function(instance) {
// 			nationInstance = instance;
// 			return nationInstance.createNationCore("", "Empty nation description", true, false);
// 		}).then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// 	it('Should fail to create a nation that already exists', function() {
// 		let nationInstance;
// 		return Nation.deployed().then(function(instance) {
// 			nationInstance = instance;
// 			return nationInstance.createNationCore("duplicate", "Duplicate nation description", true, false);
// 		}).then(function(txReceipt) {
// 			return nationInstance.createNationCore("duplicate", "Duplicate nation description", true, false);
// 		}).then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// });
