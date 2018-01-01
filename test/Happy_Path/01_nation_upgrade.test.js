let Nation = artifacts.require('./Nation.sol');
let UpgradedNation = artifacts.require('./UpgradedNation.sol');
let NationProxy = artifacts.require('./NationProxy.sol');

// Test to see if the Nation can successfully upgrade itself to UpgradedNation
// While also retaining it's data

contract('Nation Upgrade Testing', accounts => {

	let nation = {};
	let nationImpl = {};
	let nationProxy = {};

	before(async () => {
		nationImpl = await Nation.new({from: accounts[0]});
		nationProxy = await NationProxy.new(nationImpl.address, {from: accounts[0]});
		nation = Nation.at(nationProxy.address, {from: accounts[0]});
		nation.initialize(accounts[0]);
	});

	it('Should be able to create a nation core and receive the create nation event', function() {
		return nation.createNationCore("USA", "United States of America", true, false)
			.then(function(txReceipt) {
				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
				assert.equal(txReceipt.logs[0].event, "NationCoreCreated", "Event emitted should have been NationCoreCreated");
				return nation.getNationCore(1);
			}).then(function(nation) {
				assert.equal(nation[0], "USA", "Nation Name should be USA");
				assert.equal(nation[1], "United States of America", "Nation description should have been United States of America");
				assert.equal(nation[2], true, "The nation should be exists = true");
				assert.equal(nation[3], false, "The nation should not be a virtual nation");
				assert.equal(nation[4], accounts[0], "The nation founder should be the coinbase account");
			})
	});

	it('successfully upgrades the nation', function() {

		return UpgradedNation.new({from: accounts[0]}).then(function(upgradedImpl) {
			nation.upgradeNation(upgradedImpl.address, {from: accounts[0]});
			nation = UpgradedNation.at(nationProxy.address);
			return nation.isUpgraded();
		}).then(function(upgraded) {
			assert.equal(upgraded, true, "nation should have been upgraded");
		})

	});

	it('Should be able to get the same nation data out of the upgraded contract', function() {
		return nation.getNationCore(1)
			.then(function(nation) {
				assert.equal(nation[0], "USA", "Nation Name should be USA");
				assert.equal(nation[1], "United States of America", "Nation description should have been United States of America");
				assert.equal(nation[2], true, "The nation should be exists = true");
				assert.equal(nation[3], false, "The nation should not be a virtual nation");
				assert.equal(nation[4], accounts[0], "The nation founder should be the coinbase account");
			})
	});

	it('Should be able to get the initialziation block from the nations contract', function() {
		return nation.getInitializationBlock()
			.then(function(blockNumber) {
				// Just doing this for coverage, not really necessary
				console.log('Initialization Block Number: ', blockNumber);
			})
	})

});
