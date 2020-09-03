const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, currentUserId } = require("../utils");

const post = async (_parent, args, context) => {
	const userId = currentUserId(context);

	const link = await context.prisma.link.create({
		data: {
			url: args.url,
			description: args.description,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	});

	context.pubsub.publish("NEW_LINK", link);

	return link;
};

const signup = async (parent, args, context) => {
	const password = await bcrypt.hash(args.password, 10);

	const user = await context.prisma.user.create({
		data: {
			...args,
			password,
		},
	});

	const token = jwt.sign({ userId: user.id }, APP_SECRET);

	return {
		token,
		user,
	};
};

const login = async (parent, args, context) => {
	const user = await context.prisma.user.findOne({
		where: { email: args.email },
	});

	if (!user) throw new Error("No user found");

	const valid = await bcrypt.compare(args.password, user.password);

	if (!valid) throw new Error("Invalid password");

	const token = jwt.sign({ userId: user.id }, APP_SECRET);

	return {
		token,
		user,
	};
};

const vote = async (parent, args, context) => {
	const userId = currentUserId(context);

	const vote = await context.prisma.vote.findOne({
		where: {
			userId_linkId: {
				linkId: Number(args.linkId),
				userId: userId,
			},
		},
	});

	if (vote) throw new Error("Already voted for link");

	const newVote = context.prisma.vote.create({
		data: {
			user: { connect: { id: userId } },
			link: { connect: { id: Number(args.linkId) } },
		},
	});

	context.pubsub.publish("NEW_VOTE", newVote);

	return newVote;
};

module.exports = {
	post,
	signup,
	login,
	vote,
};
