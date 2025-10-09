import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const api = axios.create({
	baseURL: API_BASE,
	headers: { "Content-Type": "application/json" },
});

export const fetchHeads = (type) =>
	api.get("/heads", { params: type ? { type } : {} }).then((r) => r.data);
export const createHead = (payload) =>
	api.post("/heads", payload).then((r) => r.data);

export const fetchTransactions = (params) =>
	api.get("/transactions", { params }).then((r) => r.data);
export const deleteTransactions = (params) =>
	api.delete("/transactions", { params }).then((r) => r.data);
export const createTransaction = (payload) =>
	api.post("/transactions", payload).then((r) => r.data);
export const fetchSummary = () =>
	api.get("/transactions/summary").then((r) => r.data);

export default api;
