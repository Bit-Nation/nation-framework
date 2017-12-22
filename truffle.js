module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	networks: {
		development: {
			host: 'testrpc',
			port: 8545,
			network_id: '*'
		},
        coverage: {
            host: 'testrpc',
            network_id: '*',
            port: 8545
        }
	}
};
