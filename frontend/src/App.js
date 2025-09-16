import React, { useState, useEffect } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch('http://localhost:4000/api/expenses/');
      const json = await response.json();
      if (response.ok) setExpenses(json);
    };
    fetchExpenses();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> Dashboard</h1>
      </header>
      <main>
        <div className="left-panel">
          <AddExpense setExpenses={setExpenses} />
        </div>
        <div className="right-panel">
          <Dashboard expenses={expenses} />
          <div className="expenses-list">
            <h2>Recent Transactions</h2>
            <ExpenseList expenses={expenses} setExpenses={setExpenses} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
