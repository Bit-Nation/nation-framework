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

	it('Should be able to create a nation core', function() {
		return nation.createNationCore("USA", "United States of America", true, false)
			.then(function(txReceipt) {
				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
				assert.equal(txReceipt.logs[0].event, "NationCoreCreated", "Event emitted should have been NationCoreCreated");
			})
	});

	it('changes the owner of the nation', function() {

		return nation.changeOwner(accounts[3], {from: accounts[0]})
			.then(function(txReceipt) {
				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
				assert.equal(txReceipt.logs[0].event, "OwnerChanged", "Event emitted should have been OwnerChanged");
				assert.equal(txReceipt.logs[0].args.newOwner, accounts[3], "The new owner should be " + accounts[3]);
			})

	});

	it('successfully upgrades the nation', function() {

		return UpgradedNation.new({from: accounts[0]}).then(function(upgradedImpl) {
			nation.upgradeNation(upgradedImpl.address, {from: accounts[3]});
			nation = UpgradedNation.at(nationProxy.address);
			return nation.isUpgraded();
		}).then(function(upgraded) {
			assert.equal(upgraded, true, "nation should have been upgraded");
		})

	});

});
