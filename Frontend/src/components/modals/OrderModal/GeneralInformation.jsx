import React from 'react';
import { Controller } from 'react-hook-form';

const GeneralInformation = ({ control }) => {
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
      <div className="tab-content-row">
        <div className="tab-content-title">Срочность</div>
        <Controller
          name="urgency"
          control={control}
          render={({ field }) => (
            <select className='custom-content-input' {...field}>
              <option value="">Выбрать</option>
              {urgencyOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Дата обращения</div>
        <Controller
          name="appealDate"
          control={control}
          render={({ field }) => (
            <input type="date" className='tab-content-input' {...field} />
          )}
        />
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Дата предложения КП</div>
        <Controller
          name="proposalDate"
          control={control}
          render={({ field }) => (
            <input type="date" className='tab-content-input' {...field} />
          )}
        />
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Дата оформления заказа</div>
        <Controller
          name="orderDate"
          control={control}
          render={({ field }) => (
            <input type="date" className='tab-content-input' {...field} />
          )}
        />
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Интервал</div>
        <Controller
          name="interval"
          control={control}
          render={({ field }) => (
            <select className='custom-content-input' {...field}>
              <option value="">Выбрать</option>
              {intervalOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Тип заказа</div>
        <Controller
          name="orderType"
          control={control}
          render={({ field }) => (
            <select className='custom-content-input' {...field}>
              <option value="">Выбрать</option>
              {typeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Статус заказа</div>
        <Controller
          name="orderStatus"
          control={control}
          render={({ field }) => (
            <select className='custom-content-input' {...field}>
              <option value="">Выбрать</option>
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Причина закрытия</div>
        <Controller
          name="closeReason"
          control={control}
          render={({ field }) => (
            <select className='custom-content-input' {...field}>
              <option value="">Выбрать</option>
              {closeReasonOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Плановая дата старта</div>
        <Controller
          name="plannedStartDate"
          control={control}
          render={({ field }) => (
            <input type="date" className='tab-content-input' {...field} />
          )}
        />
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Плановая дата завершения</div>
        <Controller
          name="plannedFinishDate"
          control={control}
          render={({ field }) => (
            <input type="date" className='tab-content-input' {...field} />
          )}
        />
      </div>
    </div>
  );
};

export default GeneralInformation;
