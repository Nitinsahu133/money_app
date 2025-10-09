import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteTransactions } from "../api";
import { toast } from "react-toastify";

export default function ExpenseList({ transactions = [], onDelete }) {
	const [filterType, setFilterType] = useState("all");

	const filtered = transactions.filter((t) =>
		filterType === "all" ? true : t.type === filterType
	);

	const deleteOnClick = async (_id) => {
		const res = await deleteTransactions({ _id });
		toast.success(res);
		if (onDelete) onDelete();
	};

	return (
		<div className="card list-card">
			<h2>Transactions</h2>
			<div className="row">
				<label>Filter:</label>
				<select
					value={filterType}
					onChange={(e) => setFilterType(e.target.value)}
				>
					<option value="all">All</option>
					<option value="income">Income</option>
					<option value="expense">Expense</option>
				</select>
			</div>
			<div className="table">
				<div className="table-head">
					<div>Date</div>
					<div>Type</div>
					<div>Head</div>
					<div>Amount</div>
					<div>Action</div>
					<div>Notes</div>
				</div>
				<div className="table-body">
					{filtered.map((tx) => (
						<div className="table-row" key={tx._id}>
							<div>{new Date(tx.date).toLocaleDateString()}</div>
							<div>{tx.type}</div>
							<div>{tx.head?.name || "—"}</div>
							<div>₹ {tx.amount.toFixed(2)}</div>
							<div>
								<button onClick={() => deleteOnClick(tx._id)}>
									<MdDelete />
								</button>
							</div>
							<div>{tx.notes}</div>
						</div>
					))}
					{filtered.length === 0 && (
						<div className="empty">No transactions</div>
					)}
				</div>
			</div>
		</div>
	);
}
