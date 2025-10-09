import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import TransactionForm from "./components/TransactionForm";
import ExpenseList from "./components/ExpenseList";
import HeadCreator from "./components/HeadCreator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchTransactions, fetchSummary, fetchHeads } from "./api";

export default function App() {
	const [transactions, setTransactions] = useState([]);
	const [summary, setSummary] = useState({
		totalIncome: 0,
		totalExpense: 0,
		balance: 0,
	});
	const [heads, setHeads] = useState([]);

	const loadAll = async () => {
		try {
			const tx = await fetchTransactions({ limit: 200 });
			const s = await fetchSummary();
			const h = await fetchHeads();
			setTransactions(tx);
			setSummary(s);
			setHeads(h);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadAll();
	}, []);

	return (
		<div className="app-shell">
			<ToastContainer
				position="bottom-center"
				pauseOnHover
				newestOnTop
				hideProgressBar={true}
			/>
			<header className="topbar">
				<h1>MERN Money</h1>
			</header>
			<main className="container">
				<section className="left">
					<Dashboard summary={summary} />
					<HeadCreator onCreate={loadAll} />
				</section>
				<section className="right">
					<TransactionForm heads={heads} onCreate={loadAll} />
					<ExpenseList transactions={transactions} onDelete={loadAll} />
				</section>
			</main>
			<footer className="footer">
				© {new Date().getFullYear()} mern-money-app
			</footer>
		</div>
	);
}
