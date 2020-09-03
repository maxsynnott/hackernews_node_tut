const feed = async (_parent, args, context) => {
	let where = {};

	if (args.filter) {
		where = {
			OR: [
				{ description: { contains: args.filter } },
				{ url: { contains: args.filter } },
			],
		};
	}

	const links = await context.prisma.link.findMany({
		where,
		skip: args.offset,
		take: args.limit,
		orderBy: args.orderBy,
	});

	return {
		links,
		count: links.length,
	};
};

module.exports = {
	feed,
};
