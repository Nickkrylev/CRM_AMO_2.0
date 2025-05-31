import React, { useState } from 'react';

import GeneralInformation from './GeneralInformation';
import WorkPlan from './WorkPlan';
import Participants from './Participants';
import Finance from './Finance';
import OrderExecution from './OrderExecution';
import CompletingOrder from './CompletingOrder';

import '../../../styles/OrderModal.css';

const stages = [
  "Лиды", "Изучаем ТЗ", "Обсуждаем с клиентом", "Клиент думает",
  "Ожидаем предоплату", "Взяли в работу", "Ведется разработка",
  "На уточнении у клиента", "Тестируем", "Тестирует клиент",
  "На доработке", "Ожидаем оплату", "Успешно завершен", "Закрыт"
];

const defaultTags = ["Срочный", "В приоритете", "На паузе", "Клиент VIP"];

function OrderModal({ order, onClose, onUpdateOrder }) {
  const [selectedStage, setSelectedStage] = useState(order.stage);
  const [tags, setTags] = useState(order.tags || []);
  const [customTag, setCustomTag] = useState('');
  const [activeTab, setActiveTab] = useState('Общая информация');

  const handleTagSelect = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleCustomTagAdd = (e) => {
    if (e.key === 'Enter' && customTag.trim() && !tags.includes(customTag)) {
      setTags([...tags, customTag.trim()]);
      setCustomTag('');
      e.preventDefault();
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleStageChange = (e) => {
    setSelectedStage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrder = { id: order.id, stage: selectedStage, tags };
    onUpdateOrder(updatedOrder);
    onClose();
  };

  const progress = ((stages.indexOf(selectedStage) + 1) / stages.length) * 100;

  return (
    <div className="order-modal-overlay hidden-scroll">
        <div className="modal-content">
            <button className="close-button" onClick={onClose}>{'<'}</button>
            <form onSubmit={handleSubmit} className='order-modal-form'>
              <h2 className='modal-order-title'>Детали заказа #{order.id}</h2>
              <div className="tags-section">
                <input
                  type="text"
                  placeholder="Добавить тег или выбрать"
                  className='input-tag'
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  onKeyDown={handleCustomTagAdd}
                  list="tag-options"
                />
                <datalist id="tag-options">
                  {defaultTags.map(tag => (
                  <option key={tag} value={tag} />
                  ))}
                </datalist>
                <div className="tag-chips-container">
                  {tags.map((tag, index) => (
                    <span key={index} className="tag-chips" onClick={() => handleTagRemove(tag)}>
                    {tag} 
                    </span>
                  ))}
                </div>
              </div>

              <h3>{order.name}</h3>
              <div className="developing-stages-container">
                <label>Этап разработки:</label>
                <select value={selectedStage} onChange={handleStageChange} className='developing-stages-select'>
                    {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                    ))}
                </select>                
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <div className="tabs">
                {["Общая информация", "План работ", "Участники", "Финансы", "Выполнение заказа", "Завершение заказа"].map(tab => (
                  <button 
                    key={tab} 
                    type="button"
                    className={`tab-menu-btn${activeTab === tab ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                  </button>
                ))}
              </div>
              <div className="tab-content">
                {activeTab === "Общая информация" && <GeneralInformation order={order} />}
                {activeTab === "План работ" && <WorkPlan order={order} />}
                {activeTab === "Участники" && <Participants order={order} />}
                {activeTab === "Финансы" && <Finance order={order} />}
                {activeTab === "Выполнение заказа" && <OrderExecution order={order} />}
                {activeTab === "Завершение заказа" && <CompletingOrder order={order} />}
              </div>
              <button type="submit" className='save-order-btn'>Сохранить</button>
            </form>
        </div>
    </div>
  );
}

export default OrderModal;