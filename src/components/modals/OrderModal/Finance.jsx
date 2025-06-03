import React, { useState } from "react";
import CustomSelect from '../../ui/CustomSelect';
const Finance = () => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        let num = Number(e.target.value);
        if (num < 0) num = 0;
        if (num > 100) num = 100;

        setValue(num);
    };

    const currencyType = [
        { value: "1", label: "Гривнесы" },
        { value: "2", label: "Доллалы" },
        { value: "3", label: "Евла" },
        { value: "4", label: "спасибо" },
      ];
    const М_А_Х_И_Н_А_Ц_И_И = {
        ПартнерСумма: "2323",
        ВыручкаЗаказа: "34234234",
        СуммаИсполнителям: "234234234234",
        вЧас: "111",
        Прибыль: "222222222",
        ПрибыльПроцентВыручки: "345345345",
        ПрибыльПроцентСуммы: "345345345345",
        Чаевые: "345345345345",
        ПрибыльПлюсЧаевые: "345345345345",
        Оплата: "77777",
        ОплатаВалюта: "888888",
        ОплатаАльтернатива: "678666",
        Возврат: "77777",
        ВозвратВалюта: "888888",
        ВозвратАльтернатива: "678666",
    };
    const fieldLabels = {
        ПартнерСумма: "Партнер сумма",
        ВыручкаЗаказа: "Выручка заказа",
        СуммаИсполнителям: "Исполнителям сумма",
        вЧас: "В час",
        Прибыль: "Прибыль",
        ПрибыльПроцентВыручки: "Прибыль % от выручки",
        ПрибыльПроцентСуммы: "Прибыль % от суммы",
        Чаевые: "Чаевые",
        ПрибыльПлюсЧаевые: "Прибыль + чаевые",
        Оплата: "Оплата",
        ОплатаВалюта: "Оплата валюта",
        ОплатаАльтернатива: "Оплата альтернатива",
        Возврат: "Возврат",
        ВозвратВалюта: "Возврат валюта",
        ВозвратАльтернатива: "Возврат альтернатива",
    };
    return (
        <div className="tab-content-container">
            <div className="tab-content-row">
            <div className="tab-content-title">Доля %</div>
            <input
                type="number"
                value={value}
                onChange={handleChange}
                min="0"
                max="100"
                className='tab-content-input' 
                placeholder="..."
            />
            </div>
            <div className="tab-content-row">
                <div className="tab-content-title">Бюджет</div>
                <input type="number" className='tab-content-input' placeholder="..."/>
            </div>

            <CustomSelect name="currency_type" label="Валюта" options={currencyType} />

            <div className="tab-content-row">
                <div className="tab-content-title">Курс валют</div>
                <input type="text" className='tab-content-input' placeholder="..."/>
            </div>
            <div className="tab-content-row">
                <div className="tab-content-title">Ставка в час</div>
                <input type="number" className='tab-content-input' placeholder="..."/>
            </div>
            <div className="tab-content-row">
                <div className="tab-content-title">Округление часа</div>
                <input type="checkbox" className='tab-content-input' placeholder="..."/>
            </div>
            {Object.entries(М_А_Х_И_Н_А_Ц_И_И).map(([key, value]) => (
                <div className="tab-content-row" key={key}>
                    <div className="tab-content-title">{fieldLabels[key]}</div>
                    <span>{value}</span>
                </div>
            ))}
            <div className="tab-content-row">
                <div className="tab-content-title">Журнал оплат</div>
                <span>В разработке...</span>
            </div>
        </div>
    );
};

export default Finance;
