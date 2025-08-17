import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const Home = () => {
  const backgroundStyle = {
    backgroundImage: 'url("/expense.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '40px',
    color: 'white', // optional: improves contrast
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // optional: dark overlay for readability
    padding: '30px',
    borderRadius: '12px',
  };

  return (
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>💰 Expense Tracker</h2>
        <ExpenseForm />
        <ExpenseList />
      </div>
    </div>
  );
};

export default Home;
