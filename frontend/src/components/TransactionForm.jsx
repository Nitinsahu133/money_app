import React, { useState, useEffect } from "react";
import { createTransaction, fetchHeads } from "../api";
import { toast } from "react-toastify";

export default function TransactionForm({ heads = [], onCreate }) {
	const [type, setType] = useState("expense");
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
	const [headId, setHeadId] = useState("");
	const [notes, setNotes] = useState("");
	const [availableHeads, setAvailableHeads] = useState(heads);

	useEffect(() => {
		setAvailableHeads(heads);
		if (!headId && heads[0]) setHeadId(heads[0]._id);
	}, [heads]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!amount || !headId)
			return alert("Please enter amount and choose a head");
		try {
			const res = await createTransaction({
				amount: Number(amount),
				type,
				date,
				head: headId,
				notes,
			});
			setAmount("");
			setNotes("");
			toast.success(res);
			if (onCreate) onCreate();
		} catch (err) {
			console.log(err.message);
			alert(err?.response?.data?.message || "Error creating transaction");
		}
	};

	useEffect(() => {
		async function loadHeads() {
			if (heads.length === 0) {
				const h = await fetchHeads(type);
				setAvailableHeads(h);
				if (h[0]) setHeadId(h[0]._id);
			} else {
				const filtered = heads.filter((h) => h.type === type);
				setAvailableHeads(filtered);
				if (filtered[0]) setHeadId(filtered[0]._id);
				else setHeadId("");
			}
		}
		loadHeads();
	}, [type]);

	return (
		<div className="card form-card">
			<h2>New Transaction</h2>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<label>
						<input
							type="radio"
							name="type"
							value="expense"
							checked={type === "expense"}
							onChange={() => setType("expense")}
						/>
						Expense
					</label>
					<label>
						<input
							type="radio"
							name="type"
							value="income"
							checked={type === "income"}
							onChange={() => setType("income")}
						/>
						Income
					</label>
				</div>
				<div className="field">
					<label>Amount</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						step="0.01"
						required
					/>
				</div>
				<div className="field">
					<label>Date</label>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						required
					/>
				</div>
				<div className="field">
					<label>Head</label>
					<select
						value={headId}
						onChange={(e) => setHeadId(e.target.value)}
						required
					>
						<option value="">-- select head --</option>
						{availableHeads.map((h) => (
							<option key={h._id} value={h._id}>
								{h.name}
							</option>
						))}
					</select>
				</div>
				<div className="field">
					<label>Notes</label>
					<input
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						placeholder="optional"
					/>
				</div>
				<div className="actions">
					<button type="submit" className="btn">
						Save
					</button>
				</div>
			</form>
		</div>
	);
}
