const newLink = {
	subscribe: (parent, args, context) => {
		return context.pubsub.asyncIterator("NEW_LINK");
	},
	resolve: (payload) => payload,
};

module.exports = {
	newLink,
};
