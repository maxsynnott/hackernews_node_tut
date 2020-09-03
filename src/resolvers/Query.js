const feed = (_parent, _args, context) => {
	return context.prisma.link.findMany();
};

module.exports = {
	feed,
};
