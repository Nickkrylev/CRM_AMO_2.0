import React from 'react';
import CustomSelect from '../../ui/CustomSelect';

const CompletingOrder = ({ order }) => {
    const completingTest = {
        completingTime: "30 дней",
        completingLink: "https://www.google.com.ua"
    };

  return (
    <div className='tab-content-container'>
        <div className="tab-content-row">
            <div className="tab-content-title">Дата завершения заказа</div>
            <input type="date" className='tab-content-input'/>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Длительность заказа</div>
            <span>{completingTest.completingTime}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Впечатления о заказе</div>
            <textarea name="" id=""></textarea>
        </div>
        
        <div className="tab-content-row">
            <div className="tab-content-title">Ссылка на форму для отзыва</div>
            <a href={completingTest.completingLink}>Перейти</a>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Журнал выполнения</div>
            <span> В разработке...</span>
        </div>
    </div>
  );
};

export default CompletingOrder;