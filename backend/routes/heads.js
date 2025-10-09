const express = require("express");
const router = express.Router();
const Head = require("../models/Head");

// Create head
router.post("/", async (req, res, next) => {
	try {
		const { name, type, description } = req.body;
		const head = new Head({ name, type, description });
		await head.save();
		res.status(201).json("Head creted successfully.");
	} catch (err) {
		next(err);
	}
});

// Get all heads (optionally filter by type)
router.get("/", async (req, res, next) => {
	try {
		const filter = {};
		if (req.query.type) filter.type = req.query.type;
		const heads = await Head.find(filter).sort({ name: 1 });
		res.json(heads);
	} catch (err) {
		next(err);
	}
});

// Delete a head by id
router.delete("/:id", async (req, res, next) => {
	try {
		const head = await Head.findByIdAndDelete(req.params.id);
		if (!head) return res.status(404).json({ message: "Not found" });
		res.json({ message: "Deleted" });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
