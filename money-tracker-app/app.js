const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/moneyTrackerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const expenseRoutes = require("./routes/expenses");
const incomeRoutes = require("./routes/incomes");
app.use("/expenses", expenseRoutes);
app.use("/incomes", incomeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
