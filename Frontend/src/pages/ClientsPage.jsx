import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ClientModal from './ClientModal';
import '../styles/ClientsPage.css';
import { sampleClients } from '../data/sampleClients';

export default function ClientsPage({
  clients = sampleClients,
  onSaveClient,
  onAddCompany,
  companies = [],
  employees = [],
  referrers = [],
  countries = [],
  currencies = []
}) {
  const [clientsList, setClientsList] = useState(clients);
  const [filtered, setFiltered] = useState(clients);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeClient, setActiveClient] = useState(null);

  useEffect(() => {
    setClientsList(clients);
    setFiltered(clients);
  }, [clients]);

  useEffect(() => {
    setFiltered(
      clientsList.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, clientsList]);

  const openCreate = () => {
    setActiveClient(null);
    setShowModal(true);
  };
  const openEdit = c => {
    setActiveClient(c);
    setShowModal(true);
  };

  const handleSave = async data => {
    const saved = await onSaveClient(data);
    setClientsList(prev => {
      const exists = prev.find(x => x.id === saved.id);
      if (exists) {
        return prev.map(x => x.id === saved.id ? saved : x);
      }
      return [saved, ...prev];
    });
    setShowModal(false);
  };

  return (
    <div className="clients-layout">
      <Sidebar />
      <div className="clients-page">
        <div className="clients-header">
          <input
            className="clients-search"
            type="text"
            placeholder="Поиск клиентов..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className="create-client-btn" onClick={openCreate}>
            Создать клиента
          </button>
        </div>

        {filtered.length > 0
          ? <div className="clients-grid">
              {filtered.map(c => (
                <div
                  key={c.id}
                  className="client-card"
                  onClick={() => openEdit(c)}
                >
                  <h3>{c.name}</h3>
                  {c.full_name && <p>{c.full_name}</p>}
                  {c.email && <p>{c.email}</p>}
                  {c.phone && <p>{c.phone}</p>}
                </div>
              ))}
            </div>
          : <div className="empty-state">Клиенты не найдены</div>
        }

        {showModal && (
          <ClientModal
            client={activeClient}
            companies={companies}
            employees={employees}
            referrers={referrers}
            countries={countries}
            currencies={currencies}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            onAddCompany={onAddCompany}
          />
        )}
      </div>
    </div>
  );
}
