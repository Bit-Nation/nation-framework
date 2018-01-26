let Nation = artifacts.require('./Nation.sol');
let NationProxy = artifacts.require('./NationProxy.sol');

// Test to see if you can join and leave a nation

contract('Nation Core Creation Testing', accounts => {

	let nationInstance;

	before(async () => {
		let nationImpl = await Nation.new({from: accounts[0]});
		let nationProxy = await NationProxy.new(nationImpl.address, {from: accounts[0]});
		nationInstance = Nation.at(nationProxy.address, {from: accounts[0]});
		nationInstance.initialize(accounts[0]);
		await nationInstance.createNation("CORE HASH/JSON STRINGIFY");
	});

	it("Should not be able to join a nation that hasn't been created", function() {
		return nationInstance.joinNation(2, {from: accounts[8]})
			.then(assert.fail)
			.catch(function(error) {
				assert(error.message.indexOf('revert') >= 0, "error should be revert");
			})
	});

	it("Should not be able to join a nation twice", function() {
		return nationInstance.joinNation(1, {from: accounts[8]})
			.then(function(txReceipt) {
				return nationInstance.joinNation(1, {from:accounts[8]})
			})
			.then(assert.fail)
			.catch(function(error) {
				assert(error.message.indexOf('revert') >= 0, "error should be revert");
			})
	});

	it("Should not be able to leave a nation twice", function() {
		return nationInstance.leaveNation(1, {from: accounts[8]})
			.then(function(txReceipt) {
				return nationInstance.leaveNation(1, {from:accounts[8]})
			})
			.then(assert.fail)
			.catch(function(error) {
				assert(error.message.indexOf('revert') >= 0, "error should be revert");
			})
	});

});
