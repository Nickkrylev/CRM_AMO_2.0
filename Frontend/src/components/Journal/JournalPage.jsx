import React, { useState } from "react";
import Sidebar from "../Sidebar"; 
import "../../styles/JournalPage.css" 

const JournalPage = () => {
    
    const [logEntries, setLogEntries] = useState([
        {
            id: 1,
            description: "'GSSE'. Реализация задач за Исполнителем",
            orderNumber: "2416",
            executorRole: "Frontend Developer",
            workDate: "2 июля 2025 г.",
            startTime: "12:00",
            endTime: "17:51",
            hours: "5:51:00",
            workDone: "Доделан блок с нами работают",
        },
        {
            id: 2,
            description: "'CRM GSSE'. Разработка CRM системы",
            orderNumber: "2417",
            executorRole: "Frontend Developer",
            workDate: "1 июля 2025 г.",
            startTime: "-",
            endTime: "-",
            hours: "0:00:00",
            workDone: "Отчет за Июль 2025. Https://...",
        },
        {
            id: 3,
            description: "'CRM GSSE'. Разработка CRM системы",
            orderNumber: "2417",
            executorRole: "Frontend Developer",
            workDate: "1 июля 2025 г.",
            startTime: "-",
            endTime: "-",
            hours: "0:00:00",
            workDone: "Отчет за Июль 2025. Https://...",
        },
        {
            id: 4,
            description: "'CRM GSSE'. Разработка CRM системы",
            orderNumber: "2417",
            executorRole: "Frontend Developer",
            workDate: "1 июля 2025 г.",
            startTime: "-",
            endTime: "-",
            hours: "0:00:00",
            workDone: "Отчет за Июль 2025. Https://...",
        },
        {
            id: 5,
            description: "'CRM GSSE'. Разработка CRM системы",
            orderNumber: "2417",
            executorRole: "Frontend Developer",
            workDate: "1 июля 2025 г.",
            startTime: "-",
            endTime: "-",
            hours: "0:00:00",
            workDone: "Отчет за Июль 2025. Https://...",
        },
        {
            id: 6,
            description: "'CRM GSSE'. Разработка CRM системы",
            orderNumber: "2417",
            executorRole: "Frontend Developer",
            workDate: "1 июля 2025 г.",
            startTime: "-",
            endTime: "-",
            hours: "0:00:00",
            workDone: "Отчет за Июль 2025. Https://...",
        },
    ]);

    return (
        <div className="journal-page">
            <Sidebar />
            <div className="journal-page-main-container">
                <header className="journal-header-container">
                    <h1 className="journal-title">Журнал</h1>
                </header>

                <div className="journal-table-container">
                    <table className="journal-table">
                        <thead>
                            <tr>
                                <th>Статус заказа для исполнителя</th>
                                <th>Описание заказа</th>
                                <th>№ заказа</th>
                                <th>Исполнитель роль</th>
                                <th>Дата работы</th>
                                <th>Время начала</th>
                                <th>Время окончания</th>
                                <th>Часы</th>
                                <th>Что было сделано?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logEntries.map((entry) => (
                                <tr key={entry.id}>
                                    <td className="status-icon-cell">⚙️</td>
                                    <td>{entry.description}</td>
                                    <td>{entry.orderNumber}</td>
                                    <td>{entry.executorRole}</td>
                                    <td>{entry.workDate}</td>
                                    <td>{entry.startTime}</td>
                                    <td>{entry.endTime}</td>
                                    <td>{entry.hours}</td>
                                    <td>{entry.workDone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default JournalPage;