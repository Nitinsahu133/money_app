require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB(process.env.MONGO_URI);

// Routes
app.use("/api/heads", require("./routes/heads"));
app.use("/api/transactions", require("./routes/transactions"));

// Health
app.get("/api/ping", (req, res) => res.json({ ok: true }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
