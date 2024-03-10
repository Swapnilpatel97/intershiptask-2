// routes/expenses.js
const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");


// Get all expenses
router.get('/', async (req, res) => {
  try {
      const expenses = await Expense.find();
      res.json(expenses);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Get a specific expense
router.get('/:id', getExpense, (req, res) => {
  res.json(res.expense);
});

// Create a new expense
router.post('/', async (req, res) => {
    const { description, amount } = req.body;

    // Validate required fields
    if (!description || !amount) {
        return res
            .status(400)
            .json({ message: 'Description and amount are required fields.' });
    }

    const expense = new Expense({
        description,
        amount,
    });

    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error saving expense:', error);
        res.status(400).json({ message: error.message });
    }
});

// Update an expense
router.patch('/:id', getExpense, async (req, res) => {
  if (req.body.description != null) {
      res.expense.description = req.body.description;
  }
  if (req.body.amount != null) {
      res.expense.amount = req.body.amount;
  }

  try {
      const updatedExpense = await res.expense.save();
      res.json(updatedExpense);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

// Delete an expense
router.delete('/:id', getExpense, async (req, res) => {
  try {
      await res.expense.remove();
      res.json({ message: 'Expense deleted' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Middleware to get a specific expense by ID
async function getExpense(req, res, next) {
  let expense;
  try {
      expense = await Expense.findById(req.params.id);
      if (expense == null) {
          return res.status(404).json({ message: 'Expense not found' });
      }
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }

  res.expense = expense;
  next();
}

module.exports = router;