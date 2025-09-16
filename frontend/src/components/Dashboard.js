import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = ({ expenses }) => {
  // --- Data for Pie Chart (Expenses by Category) ---
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryData),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        ],
      },
    ],
  };

  // --- Data for Bar Chart (Monthly Expenses) ---
  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Total Expenses per Month',
        data: Object.values(monthlyData),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="chart-container">
        <h3>Spending by Category</h3>
        <Pie data={pieChartData} />
      </div>
      <div className="chart-container">
        <h3>Monthly Spending</h3>
        <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Monthly Expense Report' } } }} />
      </div>
    </div>
  );
};

export default Dashboard;
