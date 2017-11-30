let Nation = artifacts.require('./Nation.sol');
let UpgradedNation = artifacts.require('./UpgradedNation.sol');
let NationProxy = artifacts.require('./NationProxy.sol');

// Test to see if the Nation can successfully upgrade itself to UpgradedNation
// While also retaining it's data

contract('Nation Upgrade Testing', accounts => {

	let nation = {};
	let nationProxy = {};

	before(async () => {
		const nationImpl = await Nation.new();
		nationProxy = await NationProxy.new(nationImpl.address);
		nation = Nation.at(nationProxy.address);
	});

	it('gets the correct number', function() {

		return nation.getNumber().then(function(number) {
			assert.equal(number.toNumber(), 0, "Should have initialized number to zero.");
			return nation.setNumber(10);
		}).then(function(txResult) {
			return nation.getNumber();
		}).then(function(number) {
			assert.equal(number.toNumber(), 10, "Should have initialized number to 10");
		})

	});

	it('successfully upgrades the nation', function() {

		return UpgradedNation.new().then(function(upgradedImpl) {
			nation.upgradeNation(upgradedImpl.address);
			nation = UpgradedNation.at(nationProxy.address);
			return nation.isUpgraded();
		}).then(function(upgraded) {
			assert.equal(upgraded, true, "nation should have been upgraded");
		})

	});

	it('retains the number after upgrading', function() {

		return nation.getNumber().then(function(number) {
			assert.equal(number.toNumber(), 10, "Number should have remained 10 after the upgrade");
		})

	});

});