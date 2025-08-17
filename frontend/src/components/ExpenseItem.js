import React from 'react';
import api from '../api';
import './ExpenseItem.css';
import { FaTrashAlt } from 'react-icons/fa';

const ExpenseItem = ({ expense }) => {
  const handleDelete = async () => {
    await api.delete(`/expenses/${expense._id}`);
    window.location.reload();
  };

  return (
    <div className="expense-card">
      <div>
        <h4>{expense.title}</h4>
        <p>₹{expense.amount} — <em>{expense.category}</em></p>
      </div>
      <button onClick={handleDelete}><FaTrashAlt /> Delete</button>
    </div>
  );
};

export default ExpenseItem;
