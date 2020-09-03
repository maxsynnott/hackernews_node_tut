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

module.exports = {
	post,
	signup,
	login,
};
