let Nation = artifacts.require('./Nation.sol');
let NationProxy = artifacts.require('./NationProxy.sol');

// Test to see if you can set a nation's governance

contract('Nation Governance Testing', accounts => {

	let nationInstance;

	before(async() => {
		let nationImpl = await Nation.new({from: accounts[0]});
		let nationProxy = await NationProxy.new(nationImpl.address);
		nationInstance = Nation.at(nationProxy.address, {from: accounts[0]});
		nationInstance.initialize(accounts[0]);
	});

	it("Should be able to set a nation's governance", function() {
		return nationInstance.createNationCore("USA", "United States of America", true, false)
			.then(function(txReceipt) {
				return nationInstance.SetNationGovernance('USA', 'Democracy', true, 'Legal Services', false);
			}).then(function (txReceipt) {
				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
				assert.equal(txReceipt.logs[0].event, "NationGovernanceSet", "Event emitted should have been NationGovernanceSet");
			})
	});

	it("Should be able to get a nation's governance", function() {
		return nationInstance.getNationGovernance('USA')
			.then(function(governances) {
				assert.equal(governances[0], "Democracy", "Nation decision making process should've been democracy");
				assert.equal(governances[1], true, "Nation diplomatic recognition should be true");
			})
	});

});
