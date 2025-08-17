import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
  Legend
} from 'recharts';

const ExpenseChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    api.get('/expenses')
      .then((res) => {
        const grouped = {};

        res.data.forEach((expense) => {
          const date = new Date(expense.createdAt || expense.date);
          const month = date.toLocaleString('default', { month: 'short' });

          if (!grouped[month]) grouped[month] = 0;
          grouped[month] += Number(expense.amount);
        });

        const chartData = Object.entries(grouped).map(([month, total]) => ({
          month,
          total: parseFloat(total.toFixed(2)),
        }));

        setMonthlyData(chartData);
      })
      .catch((err) => console.error('Chart fetch error:', err));
  }, []);

  return (
    <div style={{ marginTop: '50px', background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: 'black' }}>
  📊 Monthly Expense Overview
</h2>


      {monthlyData.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No expense data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            barSize={50}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 14 }} />
            <YAxis tick={{ fontSize: 14 }} />
            <Tooltip
              formatter={(value) => [`₹${value}`, 'Total Spent']}
              itemStyle={{ fontSize: '14px' }}
              labelStyle={{ fontWeight: 'bold' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="total"
              name="Expenses"
              fill="#3f51b5"
              radius={[10, 10, 0, 0]}
              animationDuration={1200}
            >
              <LabelList
                dataKey="total"
                position="top"
                formatter={(v) => `₹${v}`}
                style={{ fill: '#000', fontWeight: 'bold', fontSize: 14 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpenseChart;
