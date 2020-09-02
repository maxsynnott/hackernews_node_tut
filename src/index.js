const { GraphQLServer } = require("graphql-yoga");

let links = [
	{
		id: "link-0",
		url: "www.howtographql.com",
		description: "Fullstack tutorial for GraphQL",
	},
];

let idCount = links.length;
const resolvers = {
	Query: {
		info: () => `A GraphQL server for a Hackernews clone`,
		feed: () => links,
	},
	Mutation: {
		post: (parent, args) => {
			const link = {
				id: `link-${idCount++}`,
				url: args.url,
				description: args.description,
			};

			links.push(link);

			return link;
		},
	},
};

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));