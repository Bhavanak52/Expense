import React, { useState } from 'react';
import api from '../api';
import './ExpenseForm.css';

const ExpenseForm = () => {
  const [form, setForm] = useState({ title: '', amount: '', category: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/expenses', form);
    setForm({ title: '', amount: '', category: '' });
    window.location.reload();
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} value={form.title} required />
      <input name="amount" type="number" placeholder="Amount" onChange={handleChange} value={form.amount} required />
      <input name="category" placeholder="Category" onChange={handleChange} value={form.category} required />
      <button type="submit">➕ Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
