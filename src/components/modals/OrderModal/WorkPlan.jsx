import React, { useState } from 'react';

const WorkPlan = ({ order }) => {
  const [techTags, setTechTags] = useState([]);
  const [taskTags, setTaskTags] = useState([]);
  const [customTechTag, setCustomTechTag] = useState('');
  const [customTaskTag, setCustomTaskTag] = useState('');
  const [workList, setWorkList] = useState([]);
  const [techSpecifications, setTechSpecifications] = useState(''); 

  const techTagOptions = ["React", "Node.js", "JavaScript", "Python", "Vue"];
  const taskTagOptions = ["Разработка", "Тестирование", "Дизайн", "Реализация"];
  const descriptionOptions = ["Описание 1", "Описание 2", "Описание 3"]; 

  const handleTagSelect = (tag, type) => {
    if (type === "tech" && tag && !techTags.includes(tag)) {
      setTechTags([...techTags, tag]);
    }
    if (type === "task" && tag && !taskTags.includes(tag)) {
      setTaskTags([...taskTags, tag]);
    }
  };

  const handleCustomTagAdd = (e, type) => {
    const tag = type === "tech" ? customTechTag : customTaskTag;
    if (e.key === 'Enter' && !e.shiftKey && tag.trim()) {
      if (type === "tech" && !techTags.includes(tag)) {
        setTechTags([...techTags, tag.trim()]);
        setCustomTechTag('');
      }
      if (type === "task" && !taskTags.includes(tag)) {
        setTaskTags([...taskTags, tag.trim()]);
        setCustomTaskTag('');
      }
      e.preventDefault();
    }
  };

  const handleTagRemove = (tag, type) => {
    if (type === "tech") {
      setTechTags(techTags.filter(item => item !== tag));
    } else if (type === "task") {
      setTaskTags(taskTags.filter(item => item !== tag));
    }
  };

  const handleAddWorkRow = () => {
    setWorkList([
      ...workList,
      {
        description: '',
        amount: '',
        specification: '',
        sale: false,
      },
    ]);
  };

  const handleRemoveWorkRow = (index) => {
    setWorkList(workList.filter((_, i) => i !== index));
  };

  const handleCopyWorkRow = (index) => {
    const rowToCopy = workList[index];
    const textToCopy = `Описание: ${rowToCopy.description}, Сумма: ${rowToCopy.amount}, ТЗ: ${rowToCopy.specification}, Продажа: ${rowToCopy.sale ? "Да" : "Нет"}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Данные скопированы в буфер обмена!");
    });
  };

  const handleChangeWorkRow = (index, field, value) => {
    const updatedWorkList = [...workList];
    updatedWorkList[index][field] = value;
    setWorkList(updatedWorkList);
  };

  const handleAddTechSpecToTextarea = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 

      const techSpecs = workList.map(row => row.specification).join('\n');
      setTechSpecifications(prev => prev + '\n' + techSpecs);
    }
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      setTechSpecifications(prev => prev + '\n');
    }
  };

  return (
    <div className="tab-content-container">
      <div className="tab-content-row">
        <div className="tab-content-title">Описание заказа</div>
        <textarea name="" id="" ></textarea>
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Технологии</div>
        <div className="tags-section">
          <input
            type="text"
            placeholder="Добавить тег технологии"
            value={customTechTag}
            onChange={(e) => setCustomTechTag(e.target.value)}
            onKeyDown={(e) => handleCustomTagAdd(e, "tech")}
            className='input-tag'
            list="tech-tag-options"
          />
          <datalist id="tech-tag-options">
            {techTagOptions.map((tag, index) => (
              <option key={index} value={tag} />
            ))}
          </datalist>
          <div className="tag-chips-container">
            {techTags.map((tag, index) => (
              <span key={index} className="tag-chips" onClick={() => handleTagRemove(tag, "tech")}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">Тип задач</div>
        <div className="tags-section">
          <input
            type="text"
            placeholder="Добавить тег задачи"
            value={customTaskTag}
            onChange={(e) => setCustomTaskTag(e.target.value)}
            onKeyDown={(e) => handleCustomTagAdd(e, "task")}
            className='input-tag'
            list="task-tag-options"
          />
          <datalist id="task-tag-options">
            {taskTagOptions.map((tag, index) => (
              <option key={index} value={tag} />
            ))}
          </datalist>
          <div className="tag-chips-container">
            {taskTags.map((tag, index) => (
              <span key={index} className="tag-chips" onClick={() => handleTagRemove(tag, "task")}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="tab-content-table">
        <div className="tab-content-title">Список работ</div>
        <table>
          <thead>
            <tr>
              <th>Описание</th>
              <th>Сумма</th>
              <th>ТЗ</th>
              <th>Продажа?</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {workList.map((row, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => handleChangeWorkRow(index, "description", e.target.value)}
                      placeholder="Введите описание"
                      list="description-options"
                    />
                    <datalist id="description-options">
                      {descriptionOptions.map((option, idx) => (
                        <option key={idx} value={option} />
                      ))}
                    </datalist>
                  </div>
                </td>
                <td>
                  <input
                    type="number"
                    value={row.amount}
                    onChange={(e) => handleChangeWorkRow(index, "amount", e.target.value)}
                    placeholder="..."
                  />
                </td>
                <td>
                  <textarea
                    value={row.specification}
                    onChange={(e) => {
                      handleChangeWorkRow(index, "specification", e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = e.target.scrollHeight + 'px';
                    }}
                    placeholder="Введите ТЗ"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.sale}
                    onChange={(e) => handleChangeWorkRow(index, "sale", e.target.checked)}
                  />
                </td>
                <td>
                  <div className="table-btn-section">
                    <button type="button" onClick={() => handleCopyWorkRow(index)}>📑</button>
                    <button type="button" onClick={() => handleRemoveWorkRow(index)}>❌</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="add-work-row">
          <button type="button" onClick={handleAddWorkRow}>➕</button>
        </div>
      </div>

      <div className="tab-content-row">
        <div className="tab-content-title">ТЗ</div>
        <textarea
          value={techSpecifications}
          onChange={(e) => setTechSpecifications(e.target.value)}
          onKeyDown={handleAddTechSpecToTextarea}
        />
      </div>
    </div>
  );
};

export default WorkPlan;
