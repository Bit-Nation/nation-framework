const HDWalletProvider = require("truffle-private-key-provider");

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	networks: {
		development: {
			host: 'localhost',
			port: 8545,
			network_id: '*'
		},
		testing: {
			host: 'testrpc',
			port: 8545,
			network_id: '*'
		},
		"live": {
			network_id: 1,
			host: "localhost",
			port: 8546
		},
		"rinkeby": {
            provider: function () {
				return new HDWalletProvider('662ee56d16eb0b88404214d1196d9abca3750a06ec184bbc821dbee6cd9996a1', "https://rinkeby.infura.io/metamask")
            },
            gasPrice: 22000000000,
			network_id: 4
		}
	}
};
