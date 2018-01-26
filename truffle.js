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
            provider: function () {
                return new HDWalletProvider('-', "https://mainnet.infura.io/bitnation")
            },
            gasPrice: 22000000000
		},
		"rinkeby": {
            provider: function () {
				return new HDWalletProvider('-', "https://rinkeby.infura.io/bitnation")
            },
            gasPrice: 22000000000,
			network_id: 4
		}
	}
};
