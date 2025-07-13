// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import OrdersPage from './components/Orders/OrdersPage';
import JournalPage from './components/Journal/JournalPage';
import ClientsPage from './pages/ClientsPage';

import { sampleClients } from './data/sampleClients';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

export default function App() {
  // Начальный список клиентов из sampleClients
  const [clients, setClients] = useState(sampleClients);

  // Примеры справочников для формы клиента
  const [companies, setCompanies] = useState([
    { id: 1, name: 'ООО «Ромашка»' },
    { id: 2, name: 'Acme Corp' },
  ]);
  const [employees] = useState([
    { id: 1, full_name: 'Петров Пётр' },
    { id: 2, full_name: 'Сидорова Светлана' },
  ]);
  const [referrers] = useState([
    { id: 1, name: 'Яндекс.Директ' },
    { id: 2, name: 'Google Ads' },
  ]);
  const [countries] = useState(['Россия', 'Украина', 'США', 'Канада']);
  const [currencies] = useState(['RUB', 'UAH', 'USD', 'EUR']);

  // Создать или обновить клиента
  const handleSaveClient = data => {
    if (data.id) {
      setClients(prev =>
        prev.map(c => (c.id === data.id ? data : c))
      );
      return data;
    } else {
      const newClient = { ...data, id: clients.length + 1 };
      setClients(prev => [newClient, ...prev]);
      return newClient;
    }
  };

  // Добавить компанию (примерно, без API)
  const handleAddCompany = async newCompany => {
    const created = { ...newCompany, id: companies.length + 1 };
    setCompanies(prev => [...prev, created]);
    return created;
  };

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<HomePage />} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute element={<OrdersPage />} />}
        />
        <Route
          path="/journal"
          element={<ProtectedRoute element={<JournalPage />} />}
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute
              element={
                <ClientsPage
                  clients={clients}
                  onSaveClient={handleSaveClient}
                  onAddCompany={handleAddCompany}
                  companies={companies}
                  employees={employees}
                  referrers={referrers}
                  countries={countries}
                  currencies={currencies}
                />
              }
            />
          }
        />
      </Routes>
    </ThemeProvider>
  );
}
