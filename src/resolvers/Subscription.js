const newLink = {
	subscribe: (parent, args, context) => {
		return context.pubsub.asyncIterator("NEW_LINK");
	},
	resolve: (payload) => payload,
};

const newVote = {
	subscribe: (parent, args, context) => {
		return context.pubsub.asyncIterator("NEW_VOTE");
	},
	resolve: (payload) => payload,
};

module.exports = {
	newLink,
	newVote,
};
