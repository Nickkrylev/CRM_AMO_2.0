import React from 'react';
import CustomSelect from '../../ui/CustomSelect';

const Participants = ({ order }) => {
    const orderClient = [
        { value: "1", label: "Лев" },
        { value: "2", label: "Лев Андреевич" },
        { value: "3", label: "Босс Лев" },
        { value: "4", label: "Шеф Андреевич" },
    ];

    const orderMainClient = [
        { value: "1", label: "Лев" },
        { value: "2", label: "Лев Андреевич" },
        { value: "3", label: "Босс Лев" },
        { value: "4", label: "Шеф Андреевич" },
    ];

    const clientCompany = [
        { value: "1", label: "GSSE" },
        { value: "2", label: "Говно, ведь это не GSSE" },
        { value: "3", label: "Нет ничего лучше GSSE" },
        { value: "4", label: "Точно нет ничего лучше GSSE" },
    ];
    const partnerName = [
        { value: "1", label: "Толик" },
        { value: "2", label: "Лев" },
        { value: "3", label: "Вова" },
        { value: "4", label: "Павлентий" },
    ];
    const clientInfo = {
        country: "Украина",
        category: "Алкаш",
        source: "Друг посоветовал",
        referer: "Дядя Толя",
        refererFirst: "Дядя Толя",
        manager: "Дядя Exzibit",
        isFirstOrder: false
    };
  return (
    <div className='tab-content-container'>
        <div className="tab-content-row">
            <CustomSelect name="order_client" label="Клиент" options={orderClient} />
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Третьи участники</div>
        </div>
        <div className="tab-content-row">
            <CustomSelect name="order_main_client" label="Основной клиент" options={orderMainClient} />
        </div>
        <div className="tab-content-row">
            <CustomSelect name="client_company" label="Компания" options={clientCompany} />
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Страна</div>
            <span>{clientInfo.country}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Категория</div>
            <span>{clientInfo.category}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Источник</div>
            <span>{clientInfo.source}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Реферер</div>
            <span>{clientInfo.referer}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Реферер первый</div>
            <span>{clientInfo.refererFirst}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Менеджер</div>
            <span>{clientInfo.manager}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Первый заказ?</div>
            <span>{clientInfo.isFirstOrder ? "Да" : "Нет"}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">🤝 Партнер</div>
        </div>
        <div className="tab-content-row">
            <CustomSelect name="partner_name" label="Партнер" options={partnerName} />
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Отключить долю партнера</div>
            <input type="checkbox" />
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Партнер оплата</div>
            <input type="number" className='tab-content-input' placeholder="..."/>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Партнер план</div>
            <input type="text" className='tab-content-input' placeholder="..."/>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Партнер % план</div>
            <input type="number" className='tab-content-input' placeholder="..."/>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Партнер сумма план</div>
            <input type="number" className='tab-content-input' placeholder="..."/>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Партнер недоплата</div>
            <input type="number" className='tab-content-input' placeholder="..."/>
        </div>
    </div>
  );
};

export default Participants;