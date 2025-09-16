import React, { useState } from 'react';

const ExpenseList = ({ expenses, setExpenses }) => {
  const [editState, setEditState] = useState(null); // Stores the id of the expense being edited

  // Helper to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  // --- FIXED DELETE LOGIC ---
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/api/expenses/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      // Filter out the deleted expense from the state to update the UI instantly
      setExpenses(prevExpenses => prevExpenses.filter(exp => exp._id !== id));
    } else {
      console.error("Failed to delete the expense.");
    }
  };

  // --- EDIT AND UPDATE LOGIC ---
  const handleEdit = (expense) => {
    setEditState(expense._id);
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    const updatedExpense = {
      title: e.target.title.value,
      amount: e.target.amount.value,
      date: e.target.date.value,
      category: e.target.category.value,
      description: e.target.description.value,
    };

    const response = await fetch(`http://localhost:4000/api/expenses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedExpense)
    });

    if(response.ok) {
        setExpenses(prev => prev.map(exp => (exp._id === id ? { ...exp, ...updatedExpense } : exp)));
        setEditState(null); // Exit edit mode
    } else {
        console.error("Failed to update expense");
    }
  };

  return (
    <div className="expenses">
      {expenses && expenses.map((expense) => (
        <div key={expense._id}>
          {editState === expense._id ? (
            // --- EDIT FORM ---
            <form className="expense-card" onSubmit={(e) => handleUpdate(e, expense._id)}>
              <input type="text" name="title" defaultValue={expense.title} required />
              <input type="number" name="amount" defaultValue={expense.amount} required />
              <input type="date" name="date" defaultValue={new Date(expense.date).toISOString().split('T')[0]} required />
              <select name="category" defaultValue={expense.category}>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
              <textarea name="description" defaultValue={expense.description} rows="2"></textarea>
              <div className="expense-actions">
                <button type="submit" className="action-btn edit-btn">Save</button>
                <button type="button" className="action-btn" onClick={() => setEditState(null)}>Cancel</button>
              </div>
            </form>
          ) : (
            // --- DISPLAY CARD ---
            <div className="expense-card">
              <div className="expense-item-header">
                <h4>{expense.title}</h4>
                <span className="expense-amount">{formatCurrency(expense.amount)}</span>
              </div>
              <div className="expense-meta">
                <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
                <span className="expense-category">{expense.category}</span>
              </div>
              <p className="expense-description">{expense.description}</p>
              <div className="expense-actions">
                <button className="action-btn edit-btn" onClick={() => handleEdit(expense)}>Edit</button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(expense._id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
