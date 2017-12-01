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

		return UpgradedNation.new({from: accounts[0]}).then(function(upgradedImpl) {
			nation.upgradeNation(upgradedImpl.address, {from: accounts[0]});
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