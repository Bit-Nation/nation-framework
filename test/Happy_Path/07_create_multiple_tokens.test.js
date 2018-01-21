// let TokenRegistry = artifacts.require('./TokenRegistry.sol');
// let NationStandardToken = artifacts.require('./NationStandardToken');
//
// contract('Token creation testing', accounts => {
//
// 	let registryInstance = {};
// 	let nationToken1 = {};
// 	let nationToken2 = {};
// 	let nationId = 1;
// 	let tokenAddress1;
// 	let tokenAddress2;
//
// 	it('Should be able initialize the registry and create multiple tokens', function() {
// 		return TokenRegistry.deployed().then(function(instance) {
// 			registryInstance = instance;
// 			return registryInstance.createStandardToken(nationId, 1000, "Test Nation Coin", 4, "TNC", {from: accounts[1]});
// 		}).then(function(txReceipt) {
// 			assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
// 			assert.equal(txReceipt.logs[0].event, "TokenCreated", "The second event should have been TokenCreated");
// 			tokenAddress1 = txReceipt.logs[0].args.tokenAddress;
// 			nationToken1 = NationStandardToken.at(tokenAddress1);
//
// 			return nationToken1.name();
// 		}).then(function(tokenName) {
// 			assert.equal(tokenName, "Test Nation Coin", "The token name should have been Test Nation Coin");
//
//
// 			return registryInstance.createStandardToken(nationId, 2000, "Test Nation Coin 2", 4, "TNC2", {from: accounts[1]});
// 		}).then(function(txReceipt) {
// 			assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
// 			assert.equal(txReceipt.logs[0].event, "TokenCreated", "The second event should have been TokenCreated");
// 			tokenAddress2 = txReceipt.logs[0].args.tokenAddress;
// 			nationToken2 = NationStandardToken.at(tokenAddress2);
//
// 			return nationToken2.name();
// 		}).then(function(tokenName) {
// 			assert.equal(tokenName, "Test Nation Coin 2", "The token name should have been Test Nation Coin");
// 		})
// 	});
//
// 	it("Should be able to fetch a nation's tokens", function() {
// 		return registryInstance.getTokensForNation(nationId)
// 			.then(function(tokens) {
// 				assert.equal(tokens.length, 2, "There should have been two tokens created");
// 				assert.equal(tokens[0], tokenAddress1, "The first token address should have been " + tokenAddress1);
// 				assert.equal(tokens[1], tokenAddress2, "The second token address should have been " + tokenAddress2);
// 			})
// 	})
//
// });
