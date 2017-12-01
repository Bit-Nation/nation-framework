let Nation = artifacts.require('./Nation.sol');
let NationProxy = artifacts.require('./NationProxy.sol');

contract('Nation Policy Exception Testing', accounts => {

	let nationInstance;

	before(async () => {
		let nationImpl = await Nation.new({from: accounts[0]});
		let nationProxy = await NationProxy.new(nationImpl.address, {from: accounts[0]});
		nationInstance = Nation.at(nationProxy.address, {from: accounts[0]});
		nationInstance.initialize(accounts[0]);
		nationInstance.createNationCore("USA", "United states of America", true, false)
	});

	it("Should be able to fail to set a non-existing nation's policies", function() {
		return nationInstance.SetNationPolicy("USAD", "nation code", "nationcodelink", "lawEM", true, "constitution link", true, {from: accounts[1]})
			.then(assert.fail)
			.catch(function(error) {
				assert(error.message.indexOf('revert') >= 0, "error should be revert");
			})
	});

	it("Should be able to fail to set a nation's policies because there is no nation name", function() {
		return nationInstance.SetNationPolicy("", "nation code", "nationcodelink", "lawEM", true, "constitution link", true, {from: accounts[1]})
			.then(assert.fail)
			.catch(function(error) {
				assert(error.message.indexOf('revert') >= 0, "error should be revert");
			})
	});

	it("Should be able to fail to set a nation's policies because not founder", function() {
		return nationInstance.SetNationPolicy("USA", "nation code", "nationcodelink", "lawEM", true, "constitution link", true, {from: accounts[1]})
			.then(assert.fail)
			.catch(function(error) {
				assert(error.message.indexOf('revert') >= 0, "error should be revert");
			})
	});

});