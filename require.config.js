var config = {
	config: {
		app:{
			dataStash: ['a','b','c']
		}
	}
};

if(typeof module !== 'undefined'){
	module.exports = config;
}
else if (typeof require.config !== 'undefined'){
	require.config(config);
}