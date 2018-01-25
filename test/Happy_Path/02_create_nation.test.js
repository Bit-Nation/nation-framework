let Nation = artifacts.require('./Nation.sol');

// Test to see if you can create a nation

contract('Nation Creation Testing', accounts => {

	it('Should be able to initialize nation contract with default values', function() {
		let nationInstance;
		return Nation.deployed().then(function(instance) {
			nationInstance = instance;
			return nationInstance.numNations();
		}).then(function(number) {
			assert.equal(number, 0, "Should have initialized with zero nations");
			return nationInstance.NationCoreVersion();
		}).then(function(version) {
			assert.equal(version, 1, "Should have initialized to version 1");
		})
	});

	let nationInstance;

	it('Should be able to create a nation and receive the create nation event', function() {
		return Nation.deployed().then(function(instance) {
			nationInstance = instance;
			return nationInstance.createNation("CORE HASH/JSON STRINGIFY");
		}).then(function(txReceipt) {
			assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
			assert.equal(txReceipt.logs[0].event, "NationCreated", "Event emitted should have been NationCreated");
		})
	});

	it('Should be able to get a list of the nations account[0] has founded', function() {
		return nationInstance.getFoundedNations(accounts[0])
			.then(function(nations) {
				assert.equal(nations.length, 1, "There should be one nation belonging to account[0]");
				assert.equal(nations[0], 1, "The id of the first nation should be 1");
			})
	})

});
