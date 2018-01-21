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
// 	it('Should not be able to create a token with 0 nation', function() {
// 		return TokenRegistry.deployed().then(function(instance) {
// 			registryInstance = instance;
// 			return registryInstance.createStandardToken(0, 1000, "Test Nation Coin", 4, "TNC", {from: accounts[1]});
// 		})
// 			.then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// 	it('Should not be able to create a token with no symbol', function() {
// 		return TokenRegistry.deployed().then(function(instance) {
// 			registryInstance = instance;
// 			return registryInstance.createStandardToken(nationId, 1000, "Test Nation Coin", 4, "", {from: accounts[1]});
// 		})
// 			.then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// 	it('Should not be able to create a token with no name', function() {
// 		return TokenRegistry.deployed().then(function(instance) {
// 			registryInstance = instance;
// 			return registryInstance.createStandardToken(nationId, 1000, "", 4, "TNC", {from: accounts[1]});
// 		})
// 			.then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// 	it('Should not be able to create a token with 0 initial amount', function() {
// 		return TokenRegistry.deployed().then(function(instance) {
// 			registryInstance = instance;
// 			return registryInstance.createStandardToken(nationId, 0, "Test Nation Coin", 4, "TNC", {from: accounts[1]});
// 		})
// 			.then(assert.fail)
// 			.catch(function(error) {
// 				assert(error.message.indexOf('revert') >= 0, "error should be revert");
// 			})
// 	});
//
// 	it("Should be able to fetch a nation's tokens and return 0", function() {
// 		return registryInstance.getTokensForNation(nationId)
// 			.then(function(tokens) {
// 				assert.equal(tokens.length, 0, "There should have been zero tokens created");
// 			})
// 	})
//
// });
