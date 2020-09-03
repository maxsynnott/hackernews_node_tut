const post = async (_parent, args, context) => {
	const link = await context.prisma.link.create({
		data: {
			url: args.url,
			description: args.description,
		},
	});

	return link;
};

module.exports = {
	post,
};
