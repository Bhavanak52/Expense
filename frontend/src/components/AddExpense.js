import React, { useState } from 'react';

const AddExpense = ({ setExpenses }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Food'); // Default category
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expense = { title, amount, date, category, description };

    const response = await fetch('http://localhost:4000/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: { 'Content-Type': 'application/json' },
    });
    const json = await response.json();

    if (!response.ok) setError(json.error);
    if (response.ok) {
      setTitle('');
      setAmount('');
      setDate('');
      setCategory('Food');
      setDescription('');
      setError(null);
      setExpenses(prev => [json, ...prev]);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Add New Expense</h3>
      <label>Title:</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
      
      <label>Amount (₹):</label>
      <input type="number" onChange={(e) => setAmount(e.target.value)} value={amount} required />
      
      <label>Date:</label>
      <input type="date" onChange={(e) => setDate(e.target.value)} value={date} required />
      
      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Shopping">Shopping</option>
        <option value="Health">Health</option>
        <option value="Other">Other</option>
      </select>
      
      <label>Description:</label>
      <textarea rows="3" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
      
      <button>Add Expense</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddExpense;
