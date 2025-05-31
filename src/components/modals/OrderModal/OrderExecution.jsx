import React from 'react';

const OrderExecution = ({ order }) => {
    const executionTest = {
        executionTime: "30 дней",
        startDate: "30.12.2024",
        endDate: "В процессе",
        countDays: "бесконечность",
    };

    return (
    <div className='tab-content-container'>
        <div className="tab-content-row">
            <div className="tab-content-title">Время выполнения</div>
            <span>{executionTest.executionTime}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Дата начала работ</div>
            <span>{executionTest.startDate}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Дата завершения работ</div>
            <span>{executionTest.endDate}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Дней на выполнение</div>
            <span>{executionTest.countDays}</span>
        </div>
        <div className="tab-content-row">
            <div className="tab-content-title">Журнал выполнения</div>
            <span> В разработке...</span>
        </div>
    </div>
    );
};

export default OrderExecution;
