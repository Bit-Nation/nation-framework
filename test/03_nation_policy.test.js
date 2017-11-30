let Nation = artifacts.require('./Nation.sol');

// Test to see if you can set a nation's policies

contract('Nation Policy Testing', accounts => {

	// Initialize the nation instance and create a nation before we run the rest of our tests
	before(function() {
		let nationInstance;
		return Nation.deployed().then(function (instance) {
			nationInstance = instance;
			return nationInstance.createNationCore("USA", "United states of America", true, false);
		})
	});

});