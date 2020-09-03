const user = (parent, args, context) => {
	return context.prisma.link.findOne({ where: { id: parent.id } }).user();
};

const votes = (parent, args, context) => {
	return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
};

module.exports = {
	user,
	votes,
};
