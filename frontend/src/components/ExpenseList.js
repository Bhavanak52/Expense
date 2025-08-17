import React, { useEffect, useState } from 'react';
import api from '../api';
import ExpenseItem from './ExpenseItem';
import ExpenseChart from './ExpenseChart';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    api.get('/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error('Error fetching expenses:', err));
  }, []);

  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(exp => exp.category === selectedCategory);

  const categories = [...new Set(expenses.map(exp => exp.category))];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '16px' }}>📋 All Expenses</h3>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px' }}>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '6px', borderRadius: '4px' }}
        >
          <option value="All">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredExpenses.length > 0 ? (
        <div style={{ display: 'grid', gap: '12px' }}>
          {filteredExpenses.map(exp => (
            <ExpenseItem key={exp._id} expense={exp} />
          ))}
        </div>
      ) : (
        <p>No expenses found.</p>
      )}

      <ExpenseChart expenses={expenses} />
    </div>
  );
};

export default ExpenseList;
