// routes/incomes.js
const express = require("express");
const router = express.Router();
const Income = require("../models/Income");


// Get all incomes
router.get('/', async (req, res) => {
    try {
        const incomes = await Income.find();
        res.json(incomes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific income
router.get('/:id', getIncome, (req, res) => {
    res.json(res.income);
});

// Create a new income
router.post('/', async (req, res) => {
    const income = new Income({
        description: req.body.description,
        amount: req.body.amount,
    });

    try {
        const newIncome = await income.save();
        res.status(201).json(newIncome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an income
router.patch('/:id', getIncome, async (req, res) => {
    if (req.body.description != null) {
        res.income.description = req.body.description;
    }
    if (req.body.amount != null) {
        res.income.amount = req.body.amount;
    }

    try {
        const updatedIncome = await res.income.save();
        res.json(updatedIncome);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an income
router.delete('/:id', getIncome, async (req, res) => {
    try {
        await res.income.remove();
        res.json({ message: 'Income deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to get a specific income by ID
async function getIncome(req, res, next) {
    let income;
    try {
        income = await Income.findById(req.params.id);
        if (income == null) {
            return res.status(404).json({ message: 'Income not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.income = income;
    next();
}

module.exports = router;
