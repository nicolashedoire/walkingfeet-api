const mongoose = require('mongoose');

const hikingSchema = mongoose.Schema({
	startDate : Date,
	startTime: Date,
	endTime: Date,
	duration : String,
	name : String,
	distance : String,
	checkPoints : Array,
	note : Number,
	comment : String,
	elevation : String,
	medias : Array,
	difficulty : String,
	type: String,
	family : Boolean,
	country: String,
	city: String,
	description: String,
});

const Hiking = mongoose.model("hiking" , hikingSchema, 'hiking');

module.exports = {
Hiking
};