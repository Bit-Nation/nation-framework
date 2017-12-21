let TokenRegistry = artifacts.require('./TokenRegistry.sol');
let NationStandardToken = artifacts.require('./NationStandardToken');

contract('Token creation testing', accounts => {

	let registryInstance = {};
	let nationToken = {};
	let nationName = "TestNation";
	let tokenAddress;

	let account0initialBalance;
	let account1initialBalance;
	let account2initialBalance;

	before(() => {
		return TokenRegistry.deployed().then(function(instance) {
			registryInstance = instance;
			return registryInstance.createStandardToken(nationName, 1000, "Test Nation Coin", 4, "TNC", {from: accounts[0]});
		}).then(function(txReceipt) {
			assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
			assert.equal(txReceipt.logs[0].event, "TokenCreated", "The second event should have been TokenCreated");
			tokenAddress = txReceipt.logs[0].args.tokenAddress;
			nationToken = NationStandardToken.at(tokenAddress);
		})
	});

	beforeEach(() => {
		return nationToken.balanceOf(accounts[0])
			.then(function(balance) {
				account0initialBalance = balance;
				return nationToken.balanceOf(accounts[1])
			}).then(function(balance) {
				account1initialBalance = balance;
				return nationToken.balanceOf(accounts[2])
			}).then(function(balance) {
				account2initialBalance = balance;
			})
	});

	it("Should be able to transfer tokens from accounts[0] to accounts[1]", function() {
		return nationToken.transfer(accounts[1], 100, {from: accounts[0]})
			.then(function(txReceipt) {
				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
				assert.equal(txReceipt.logs[0].event, "Transfer", "The event should have been Transfer");
				return nationToken.balanceOf(accounts[1]);
			}).then(function(balance) {
				assert.equal(balance - account1initialBalance, 100, "account 1 should have 100 more tokens now");
				return nationToken.balanceOf(accounts[0]);
			}).then(function(balance) {
				assert.equal(account0initialBalance - balance, 100, "account 0 should have 100 less tokens now");
			})
	});

	it("Should be able to approve accounts[2] to spend 100 tokens from accounts[0]", function() {
		return nationToken.approve(accounts[2], 100, {from: accounts[0]})
			.then(function(txReceipt) {
				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
				assert.equal(txReceipt.logs[0].event, "Approval", "The event should have been Approval");
				return nationToken.allowance(accounts[0], accounts[2])
			}).then(function(allowance) {
				assert.equal(allowance, 100, "Account 2 should have an allowance of 100 tokens");
				return nationToken.transferFrom(accounts[0], accounts[1], 100, {from: accounts[2]})
			}).then(function(txReceipt) {
				assert.equal(txReceipt.logs.length, 1, "There should have been one event emitted");
				assert.equal(txReceipt.logs[0].event, "Transfer", "The event should have been Transfer");

				return nationToken.balanceOf(accounts[0]);
			}).then(function(balance) {
				assert.equal(account0initialBalance - balance, 100, "Account 0 should be 50 tokens poorer");

				return nationToken.balanceOf(accounts[1]);
			}).then(function(balance) {
				assert.equal(balance - account1initialBalance, 100, "Account 1 should be 50 tokens richer");

				return nationToken.balanceOf(accounts[2]);
			}).then(function(balance) {
				assert.equal(account2initialBalance.toNumber(), balance.toNumber(), "Account 2's balance shouldn't have changed");
			})
	})

});
