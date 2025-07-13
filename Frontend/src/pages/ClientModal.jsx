// src/components/Client/ClientModal.jsx
import React, { useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import AddCompanyModal from '../components/Client/AddCompanyForm';
import '../styles/ClientModal.css';

const stages = ["Новый", "Контакт установлен", "В работе", "Ожидаем оплату", "Закрыт"];

export default function ClientModal({
  client,
  companies = [],    // [{ id, name }]
  employees = [],    // [{ id, full_name }]
  referrers = [],    // [{ id, name }]
  countries = [],    // ['Россия','Украина', ...]
  currencies = [],   // ['USD','EUR','UAH', ...]
  onClose,
  onSave,            // fn(data)
  onAddCompany       // async fn({ name, site, address }) → { id, name, site, address }
}) {
  const [showCompanyModal, setShowCompanyModal] = useState(false);

  const methods = useForm({
    mode: 'all',          // валидация на изменение и при submit
    reValidateMode: 'all',
    defaultValues: {
      name: client?.name || '',
      messenger_name: client?.messenger_name || '',
      intro_description: client?.intro_description || '',
      note: client?.note || '',
      category: client?.category || '',
      source: client?.source || '',
      full_name: client?.full_name || '',
      phone: client?.phone || '',
      email: client?.email || '',
      country: client?.country || '',
      city: client?.city || '',
      currency: client?.currency || '',
      payment_details: client?.payment_details || '',
      hourly_rate: client?.hourly_rate || '',
      percent: client?.percent || '',
      share_info: client?.share_info || '',
      referrer_id: client?.referrer_id || '',
      referrer_first_id: client?.referrer_first_id || '',
      manager_id: client?.manager_id || '',
      company_id: client?.company_id || '',
      chat_link: client?.chat_link || '',
      photo_link: client?.photo_link || '',
      folder_link: client?.folder_link || '',
      stage: client?.stage || stages[0]
    }
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isDirty }
  } = methods;

  const onSubmit = data => {
    onSave(data);
    onClose();
  };

  return (
    <>
      <div className="client-modal-overlay">
        <div className="client-modal">
          <button className="back-btn" onClick={onClose}>← Назад</button>

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="client-form">
              <h2 className="modal-title">
                {client ? 'Редактировать клиента' : 'Создать клиента'}
              </h2>

              {/* Клиент */}
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Поле обязательно' }}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Клиент</label>
                    <input
                      {...field}
                      placeholder="Клиент"
                      className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                  </div>
                )}
              />

              {/* Messenger name */}
              <Controller
                name="messenger_name"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Имя в мессенджере</label>
                    <input {...field} placeholder="Имя в мессенджере" />
                  </div>
                )}
              />

              {/* Intro description */}
              <Controller
                name="intro_description"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Вводное описание</label>
                    <textarea {...field} placeholder="Вводное описание" />
                  </div>
                )}
              />

              {/* Note */}
              <Controller
                name="note"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Примечание</label>
                    <textarea {...field} placeholder="Примечание" />
                  </div>
                )}
              />

              {/* Category */}
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Категория</label>
                    <input {...field} placeholder="Категория" />
                  </div>
                )}
              />

              {/* Source */}
              <Controller
                name="source"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Источник</label>
                    <input {...field} placeholder="Источник" />
                  </div>
                )}
              />

              {/* Full name */}
              <Controller
                name="full_name"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>ФИО</label>
                    <input {...field} placeholder="ФИО" />
                  </div>
                )}
              />

              {/* Phone */}
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Телефон обязателен' }}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Телефон</label>
                    <input
                      {...field}
                      placeholder="Телефон"
                      className={errors.phone ? 'input-error' : ''}
                    />
                    {errors.phone && <p className="error">{errors.phone.message}</p>}
                  </div>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email обязателен',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Неверный формат'
                  }
                }}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Почта</label>
                    <input
                      {...field}
                      placeholder="Email"
                      className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                  </div>
                )}
              />

              {/* Country */}
              <Controller
                name="country"
                control={control}
                rules={{ required: 'Выберите страну' }}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Страна</label>
                    <select
                      {...field}
                      className={errors.country ? 'input-error' : ''}
                    >
                      <option value="">-- Выберите страну --</option>
                      {countries.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {errors.country && <p className="error">{errors.country.message}</p>}
                  </div>
                )}
              />

              {/* City */}
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Город</label>
                    <input {...field} placeholder="Город" />
                  </div>
                )}
              />

              {/* Currency */}
              <Controller
                name="currency"
                control={control}
                rules={{ required: 'Выберите валюту' }}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Валюта</label>
                    <select
                      {...field}
                      className={errors.currency ? 'input-error' : ''}
                    >
                      <option value="">-- Выберите валюту --</option>
                      {currencies.map(cur => (
                        <option key={cur} value={cur}>{cur}</option>
                      ))}
                    </select>
                    {errors.currency && <p className="error">{errors.currency.message}</p>}
                  </div>
                )}
              />

              {/* Payment details */}
              <Controller
                name="payment_details"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Реквизиты для оплаты</label>
                    <textarea {...field} placeholder="Реквизиты для оплаты" />
                  </div>
                )}
              />

              {/* Hourly rate */}
              <Controller
                name="hourly_rate"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>В час</label>
                    <input {...field} placeholder="В час" />
                  </div>
                )}
              />

              {/* Percent */}
              <Controller
                name="percent"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>%</label>
                    <input {...field} placeholder="%" />
                  </div>
                )}
              />

              {/* Share info */}
              <Controller
                name="share_info"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Доля?</label>
                    <input {...field} placeholder="Доля?" />
                  </div>
                )}
              />

              {/* Referrer */}
              <Controller
                name="referrer_id"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Реферер</label>
                    <select {...field}>
                      <option value="">-- Выберите реферера --</option>
                      {referrers.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              />

              {/* Referrer first */}
              <Controller
                name="referrer_first_id"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Реферер первый</label>
                    <select {...field}>
                      <option value="">-- Выберите первого реферера --</option>
                      {referrers.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              />

              {/* Manager */}
              <Controller
                name="manager_id"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Менеджер</label>
                    <select {...field}>
                      <option value="">-- Выберите менеджера --</option>
                      {employees.map(e => (
                        <option key={e.id} value={e.id}>{e.full_name}</option>
                      ))}
                    </select>
                  </div>
                )}
              />

              {/* Company */}
              <Controller
                name="company_id"
                control={control}
                rules={{ required: 'Выберите компанию' }}
                render={({ field: { value, onChange } }) => (
                  <div className="form-section">
                    <label>Компания</label>
                    <div className="company-select-wrapper">
                      <select
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        className={errors.company_id ? 'input-error' : ''}
                      >
                        <option value="">-- Выберите компанию --</option>
                        {companies.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        className="add-btn"
                        onClick={() => setShowCompanyModal(true)}
                      >+</button>
                    </div>
                    {errors.company_id && <p className="error">{errors.company_id.message}</p>}
                  </div>
                )}
              />

              {/* Chat link */}
              <Controller
                name="chat_link"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Ссылка на чат</label>
                    <input {...field} placeholder="Ссылка на чат" />
                  </div>
                )}
              />

              {/* Photo link */}
              <Controller
                name="photo_link"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Ссылка на фото</label>
                    <input {...field} placeholder="Ссылка на фото" />
                  </div>
                )}
              />

              {/* Folder link */}
              <Controller
                name="folder_link"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Ссылка на папку</label>
                    <input {...field} placeholder="Ссылка на папку" />
                  </div>
                )}
              />

              {/* Stage */}
              <Controller
                name="stage"
                control={control}
                render={({ field }) => (
                  <div className="form-section">
                    <label>Стадия</label>
                    <select {...field}>
                      {stages.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                )}
              />

              {/* Actions */}
              <div className="form-actions">
                <button type="button" onClick={() => reset()} disabled={!isDirty}>
                  Сбросить
                </button>
                <button type="submit" disabled={!isValid}>
                  Сохранить
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      {showCompanyModal && (
        <AddCompanyModal
          onCreate={async data => {
            const created = await onAddCompany(data);
            setValue('company_id', created.id);
            setShowCompanyModal(false);
          }}
          onCancel={() => setShowCompanyModal(false)}
        />
      )}
    </>
  );
}
