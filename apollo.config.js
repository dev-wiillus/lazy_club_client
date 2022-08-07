module.exports = {
	client: {
		includes: ['./pages/**/*.tsx'],
		tagName: 'gql',
		service: {
			name: 'lazy-club-backend',
			url: 'http://localhost:4000/graphql',
		},
	},
};
