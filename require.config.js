var config = {
	config: {
		app:{

		}
	}
};

if(typeof module !== 'undefined'){
	module.exports = config;
}
else if (typeof require.config !== 'undefined'){
	require.config(config);
}