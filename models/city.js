const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
	country: String,
	name: String,
});

const City = mongoose.model("city" , citySchema, 'city');

module.exports = {
City
};