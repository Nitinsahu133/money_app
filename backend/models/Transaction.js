const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
	{
		amount: { type: Number, required: true },
		type: { type: String, enum: ["income", "expense"], required: true },
		date: { type: Date, required: true, default: Date.now },
		head: { type: mongoose.Schema.Types.ObjectId, ref: "Head", required: true },
		notes: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
