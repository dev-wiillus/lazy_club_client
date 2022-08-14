module.exports = {
	client: {
		includes: [
			'pages/**/*.tsx',
			'services/**/*.tsx',
			'services/**/*.ts',
			'utils/**/*.ts',
		],
		tagName: 'gql',
		service: {
			name: 'lazy-club-backend',
			url: 'http://localhost:4000/graphql',
		},
	},
};
