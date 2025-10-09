import React from "react";

export default function Dashboard({ summary }) {
	return (
		<div className="card dashboard">
			<h2>Dashboard</h2>
			<div className="grid">
				<div className="tile">
					<div className="label">Income</div>
					<div className="value">₹ {summary.totalIncome?.toFixed(2)}</div>
				</div>
				<div className="tile">
					<div className="label">Expense</div>
					<div className="value">₹ {summary.totalExpense?.toFixed(2)}</div>
				</div>
				<div className="tile">
					<div className="label">Balance</div>
					<div className="value">₹ {summary.balance?.toFixed(2)}</div>
				</div>
			</div>
		</div>
	);
}
