let Nation = artifacts.require('./Nation.sol');

// Test to see if you can create a nation

contract('Nation Core Creation Testing', accounts => {

	it('Should be able to initialize nation contract with default values', function() {
		let nationInstance;
		return Nation.deployed().then(function(instance) {
			nationInstance = instance;
			return nationInstance.numNations();
		}).then(function(number) {
			assert.equal(number, 0, "Should have initialized with zero nations");
			return nationInstance.NationCoreVersion();
		}).then(function(version) {
			assert.equal(version, 3, "Should have initialized to version 3 ");
		})
	});

	it('Should fail to create a nation without a name', function() {
		let nationInstance;
		return Nation.deployed().then(function(instance) {
			nationInstance = instance;
			return nationInstance.createNationCore("", "Empty nation description", true, false);
		}).then(assert.fail)
			.catch(function(error) {
				assert(error.message.indexOf('revert') >= 0, "error should be revert");
			})
	});

	it('Should be able to create a nation core and receive the create nation event', function() {
		let nationInstance;
		return Nation.deployed().then(function(instance) {
			nationInstance = instance;
			return nationInstance.createNationCore("USA", "United States of America", true, false);
		}).then(function(txReceipt) {
			assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
			assert.equal(txReceipt.logs[0].event, "NationCoreCreated", "Event emitted should have been NationCoreCreated");
			return nationInstance.getNationCore('USA');
		}).then(function(nation) {
			assert.equal(nation[0].toNumber(), 1, "Nation Id should be 1");
			assert.equal(nation[1], "United States of America", "Nation description should have been United States of America");
			assert.equal(nation[2], true, "The nation should be exists = true");
			assert.equal(nation[3], false, "The nation should not be a virtual nation");
			assert.equal(nation[4], accounts[0], "The nation founder should be the coinbase account");
		})
	});

	it('Should fail to create a nation that already exists', function() {
		let nationInstance;
		return Nation.deployed().then(function(instance) {
			nationInstance = instance;
			return nationInstance.createNationCore("USA", "Duplicate nation description", true, false);
		}).then(assert.fail)
			.catch(function(error) {
				assert(error.message.indexOf('revert') >= 0, "error should be revert");
			})
	});

});