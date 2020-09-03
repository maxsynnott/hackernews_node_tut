const user = (parent, args, context) => {
	return context.prisma.link.findOne({ where: { id: parent.id } }).user();
};

module.exports = {
	user,
};
