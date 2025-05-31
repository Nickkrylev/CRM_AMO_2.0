import React from 'react';
import CustomSelect from '../../ui/CustomSelect';

const GeneralInformation = ({ order }) => {
  const urgencyOptions = [
    { value: "1", label: "Не горит" },
    { value: "2", label: "Умеренно" },
    { value: "3", label: "Жопа уже подгорает" },
    { value: "4", label: "ЛИБО СДАЛ ЛИБО ШТРАФ" },
  ];

  const intervalOptions = [
    { value: "1", label: "Что-то там" },
    { value: "2", label: "Чуть подольше" },
    { value: "3", label: "Долго" },
    { value: "4", label: "Бесконечность" },
  ];

  const typeOptions = [
    { value: "1", label: "Парсер" },
    { value: "2", label: "Тг-бот" },
    { value: "3", label: "Вёрстка" },
    { value: "4", label: "Таблица" },
  ];

  const statusOptions = [
    { value: "1", label: "Обсуждение" },
    { value: "2", label: "Составление ТЗ" },
    { value: "3", label: "Разработка" },
    { value: "4", label: "Завершен" },
  ];

  const closeReasonOptions = [
    { value: "1", label: "Завершен" },
    { value: "2", label: "Кинули" },
    { value: "3", label: "Заказчик умер" },
    { value: "4", label: "Закончились деньги" },
  ];

  return (
    <div className='tab-content-container'>
      <div className="tab-content-title-section">
        <h2 className='order-menu-title'>Заказ #</h2>{order.id}
      </div>

      <CustomSelect name="order_urgency" label="Срочность" options={urgencyOptions} />
      <div className="tab-content-row">
        <div className="tab-content-title">Дата обращения</div>
        <input type="date" className='tab-content-input'/>
      </div>
      <div className="tab-content-row">
        <div className="tab-content-title">Дата предложения КП</div>
        <input type="date" className='tab-content-input'/>
      </div>
      <div className="tab-content-row">
        <div className="tab-content-title">Дата оформления заказа</div>
        <input type="date" className='tab-content-input'/>
      </div>

      <CustomSelect name="order_interval" label="Интервал" options={intervalOptions} />
      <CustomSelect name="order_type" label="Тип заказа" options={typeOptions} />
      <CustomSelect name="order_status" label="Статус заказа" options={statusOptions} />
      <CustomSelect name="order_close_reason" label="Причина закрытия" options={closeReasonOptions} />

      <div className="tab-content-row">
        <div className="tab-content-title">Плановая дата старта</div>
        <input type="date" className='tab-content-input'/>
      </div>
      <div className="tab-content-row">
        <div className="tab-content-title">Плановая дата завершения</div>
        <input type="date" className='tab-content-input'/>
      </div>
    </div>
  );
};

export default GeneralInformation;
