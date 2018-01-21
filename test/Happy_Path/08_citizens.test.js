// let Nation = artifacts.require('./Nation.sol');
// let NationProxy = artifacts.require('./NationProxy.sol');
//
// // Test to see if you can join and leave a nation
//
// contract('Nation Core Creation Testing', accounts => {
//
// 	let nationInstance;
//
// 	before(async () => {
// 		let nationImpl = await Nation.new({from: accounts[0]});
// 		let nationProxy = await NationProxy.new(nationImpl.address, {from: accounts[0]});
// 		nationInstance = Nation.at(nationProxy.address, {from: accounts[0]});
// 		nationInstance.initialize(accounts[0]);
// 		await nationInstance.createNationCore("USA", "United states of America", true, false);
// 	});
//
// 	it("Should be able to join the created nation", function() {
// 		return nationInstance.joinNation(1, {from: accounts[8]})
// 			.then(function(txReceipt) {
// 				assert.equal(txReceipt.logs.length, 1, "There should have been 1 event emitted");
// 				assert.equal(txReceipt.logs[0].event, "CitizenJoined", "The event should have been CitizenJoined");
// 				return nationInstance.checkCitizen(accounts[8], 1);
// 			}).then(function(isCitizen) {
// 				assert.isTrue(isCitizen, "The citizen should be a member of the nation.");
// 				return nationInstance.getNumCitizens(1);
// 			}).then(function(numCitizens) {
// 				assert.equal(numCitizens, 1, "There should be 1 citizen in the nation.");
//
// 				return nationInstance.joinNation(1, {from: accounts[9]});
// 			}).then(function(txReceipt) {
// 				assert.equal(txReceipt.logs.length, 1, "There should have been 1 event emitted");
// 				assert.equal(txReceipt.logs[0].event, "CitizenJoined", "The event should have been CitizenJoined");
// 				return nationInstance.checkCitizen(accounts[9], 1);
// 			}).then(function(citizen) {
// 				assert.isTrue(citizen, "The citizen should be a member of the nation.");
// 				return nationInstance.getNumCitizens(1);
// 			}).then(function(numCitizens) {
// 				assert.equal(numCitizens, 2, "There should be 2 citizens in the nation.");
// 			})
// 	});
//
// 	it("Should be able to leave a nation", function() {
// 		return nationInstance.leaveNation(1, {from: accounts[8]})
// 			.then(function(txReceipt) {
// 				assert.equal(txReceipt.logs.length, 1, "There should have been 1 event emitted");
// 				assert.equal(txReceipt.logs[0].event, "CitizenLeft", "The event fired should have been CitizenLeft");
// 				return nationInstance.checkCitizen(accounts[8], 1);
// 			}).then(function(isCitizen) {
// 				assert.isFalse(isCitizen, "The citizen should not be a member of nation 1");
// 				return nationInstance.getNumCitizens(1);
// 			}).then(function(numCitizens) {
// 				assert.equal(numCitizens, 1, "There should be 1 citizen in the nation.");
// 			})
// 	})
//
// });
