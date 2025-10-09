const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Head = require("../models/Head");

// Create transaction
router.post("/", async (req, res, next) => {
	try {
		const { amount, type, date, head: headId, notes } = req.body;

		// ensure head exists and matches type
		const head = await Head.findById(headId);
		if (!head || head.type !== type) {
			return res
				.status(400)
				.json({ message: "Head not found or type mismatch" });
		}

		const t = new Transaction({
			amount,
			type,
			date: date || Date.now(),
			head: headId,
			notes,
		});
		await t.save();
		const populated = await t.populate("head");
		res.status(201).json("Transaction saved successfully");
	} catch (err) {
		next(err);
	}
});

// List transactions with optional query params: type, from, to, limit, skip
router.get("/", async (req, res, next) => {
	try {
		const { type, from, to, limit = 100, skip = 0 } = req.query;
		const filter = {};
		if (type) filter.type = type;
		if (from || to) filter.date = {};
		if (from) filter.date.$gte = new Date(from);
		if (to) filter.date.$lte = new Date(to);

		const tx = await Transaction.find(filter)
			.sort({ date: -1 })
			.skip(parseInt(skip))
			.limit(parseInt(limit))
			.populate("head");
		res.json(tx);
	} catch (err) {
		next(err);
	}
});

router.delete("/", async (req, res, next) => {
	try {
		await Transaction.deleteOne({ _id: req.query._id });
		res.status(201).json("Deleted Successfully");
	} catch (error) {
		next(error);
	}
});

// Get summary totals (basic)
router.get("/summary", async (req, res, next) => {
	try {
		const incomes = await Transaction.aggregate([
			{ $match: { type: "income" } },
			{ $group: { _id: null, total: { $sum: "$amount" } } },
		]);
		const expenses = await Transaction.aggregate([
			{ $match: { type: "expense" } },
			{ $group: { _id: null, total: { $sum: "$amount" } } },
		]);
		res.json({
			totalIncome: incomes[0] ? incomes[0].total : 0,
			totalExpense: expenses[0] ? expenses[0].total : 0,
			balance:
				(incomes[0] ? incomes[0].total : 0) -
				(expenses[0] ? expenses[0].total : 0),
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
