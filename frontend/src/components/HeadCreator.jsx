import React, { useState } from "react";
import { createHead } from "../api";
import { toast } from "react-toastify";

export default function HeadCreator({ onCreate }) {
	const [name, setName] = useState("");
	const [type, setType] = useState("expense");
	const [description, setDescription] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name) return alert("Enter name");
		try {
			const res = await createHead({ name, type, description });
			setName("");
			setDescription("");
			toast.success(res);
			if (onCreate) onCreate();
		} catch (err) {
			console.error(err);
			alert("Error creating head");
		}
	};

	return (
		<div className="card head-creator">
			<h2>Add Head</h2>
			<form onSubmit={handleSubmit}>
				<div className="field">
					<label>Name</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div className="row">
					<label>
						<input
							type="radio"
							checked={type === "expense"}
							onChange={() => setType("expense")}
						/>{" "}
						Expense
					</label>
					<label>
						<input
							type="radio"
							checked={type === "income"}
							onChange={() => setType("income")}
						/>{" "}
						Income
					</label>
				</div>
				<div className="field">
					<label>Description</label>
					<input
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className="actions">
					<button className="btn">Add Head</button>
				</div>
			</form>
		</div>
	);
}
