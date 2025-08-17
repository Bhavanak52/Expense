const router = require('express').Router();
const Expense = require('../models/Expense');

router.get('/', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

router.post('/', async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.json(newExpense);
});

router.put('/:id', async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
