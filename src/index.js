const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
	Query: {
		info: () => `A GraphQL server for a Hackernews clone`,
		feed: async (_parent, _args, context) => {
			return context.prisma.link.findMany();
		},
	},
	Mutation: {
		post: async (_parent, args, context) => {
			const link = await context.prisma.link.create({
				data: {
					url: args.url,
					description: args.description,
				},
			});

			return link;
		},
	},
};

const prisma = new PrismaClient();

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
	context: {
		prisma,
	},
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
