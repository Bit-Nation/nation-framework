// let Nation = artifacts.require('./Nation.sol');
//
// // Test to see if you can create a nation
//
// contract('Nation Core Creation Testing', accounts => {
//
// 	it('Should be able to initialize nation contract with default values', function() {
// 		let nationInstance;
// 		return Nation.deployed().then(function(instance) {
// 			nationInstance = instance;
// 			return nationInstance.numNations();
// 		}).then(function(number) {
// 			assert.equal(number, 0, "Should have initialized with zero nations");
// 			return nationInstance.NationCoreVersion();
// 		}).then(function(version) {
// 			assert.equal(version, 1, "Should have initialized to version 1");
// 		})
// 	});
//
// 	let nationInstance;
//
// 	it('Should be able to create a nation core and receive the create nation event', function() {
// 		return Nation.deployed().then(function(instance) {
// 			nationInstance = instance;
// 			return nationInstance.createNationCore("USA", "United States of America", true, false);
// 		}).then(function(txReceipt) {
// 			assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
// 			assert.equal(txReceipt.logs[0].event, "NationCoreCreated", "Event emitted should have been NationCoreCreated");
// 			return nationInstance.getNationCore(1);
// 		}).then(function(nation) {
// 			assert.equal(nation[0], "USA", "Nation name should be USA");
// 			assert.equal(nation[1], "United States of America", "Nation description should have been United States of America");
// 			assert.equal(nation[2], true, "The nation should be exists = true");
// 			assert.equal(nation[3], false, "The nation should not be a virtual nation");
// 			assert.equal(nation[4], accounts[0], "The nation founder should be the coinbase account");
//
// 			// Test that we are getting the right nation name from the registry
// 			return nationInstance.getNationName(1);
// 		}).then(function(nationName) {
// 			assert.equal(nationName, "USA", "Nation name should be USA");
// 		})
// 	});
//
// 	it('Should be able to get a list of the nations account[0] has founded', function() {
// 		return nationInstance.getFoundedNations(accounts[0])
// 			.then(function(nations) {
// 				assert.equal(nations.length, 1, "There should be one nation belonging to account[0]");
// 				assert.equal(nations[0], 1, "The id of the first nation should be 1");
// 				return nationInstance.createNationCore("Canada", "Canada Nation", true, false);
// 			}).then(function(txReceipt) {
// 				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
// 				assert.equal(txReceipt.logs[0].event, "NationCoreCreated", "Event emitted should have been NationCoreCreated");
// 				return nationInstance.getFoundedNations(accounts[0]);
// 			}).then(function(nations) {
// 				assert.equal(nations.length, 2, "There should be two nations belonging to account[0]");
// 				assert.equal(nations[0], 1, "The id of the first nation should be 1");
// 				assert.equal(nations[1], 2, "The id of the second nation should be 2");
// 			})
// 	})
//
// });
