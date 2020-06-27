const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	role: String,
	googleId: String,
	googleAccessToken: String,
	googleTokenId: String,
	pseudo: String,
	email: { type: String, required: true, unique: true },
	firstname: String,
	lastname: String,
	password: String,
	picture: String,
	premium: Boolean,
	sex: String,
	isBlocked: Boolean,
	latitude: String,
	longitude: String,
	created: Date
});

const User = mongoose.model("user", userSchema, 'user');

module.exports = {
	User
};