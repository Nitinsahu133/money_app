const mongoose = require("mongoose");

const HeadSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		type: { type: String, enum: ["income", "expense"], required: true },
		description: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Head", HeadSchema);
