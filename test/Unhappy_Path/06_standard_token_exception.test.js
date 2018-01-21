// let TokenRegistry = artifacts.require('./TokenRegistry.sol');
// let NationStandardToken = artifacts.require('./NationStandardToken');
//
// contract('Token creation testing', accounts => {
//
// 	let registryInstance = {};
// 	let nationToken = {};
// 	let nationId = 1;
// 	let tokenAddress;
//
// 	before(() => {
// 		return TokenRegistry.deployed().then(function(instance) {
// 			registryInstance = instance;
// 			return registryInstance.createStandardToken(nationId, 1000, "Test Nation Coin", 4, "TNC", {from: accounts[0]});
// 		}).then(function(txReceipt) {
// 			assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
// 			assert.equal(txReceipt.logs[0].event, "TokenCreated", "The second event should have been TokenCreated");
// 			tokenAddress = txReceipt.logs[0].args.tokenAddress;
// 			nationToken = NationStandardToken.at(tokenAddress);
// 		})
// 	});
//
// 	it("Should fail to transfer tokens from accounts[1] to accounts[2]", function() {
// 		return nationToken.transfer(accounts[2], 100, {from: accounts[1]})
// 			.then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// 	it("Should fail to to approve accounts[2] to spend 100 tokens from accounts[1]", function() {
// 		return nationToken.approve(accounts[2], 100, {from: accounts[1]})
// 			.then(function(txReceipt) {
// 				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
// 				assert.equal(txReceipt.logs[0].event, "Approval", "The event should have been Approval");
// 				return nationToken.allowance(accounts[1], accounts[2])
// 			}).then(function(allowance) {
// 				assert.equal(allowance, 100, "Account 2 should have an allowance of 100 tokens");
// 				return nationToken.transferFrom(accounts[1], accounts[2], 100, {from: accounts[2]})
// 			})
// 			.then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// 	it("Should be able to get the initial balances", function() {
// 		return nationToken.balanceOf(accounts[0])
// 			.then(function(balance) {
// 				assert.equal(balance.toNumber(), 1000, "Account[0] should still have 1000 tokens.");
// 			})
// 	})
//
// });
