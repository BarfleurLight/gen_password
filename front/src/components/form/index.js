import styles from './style.module.css'
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import {defoltConsts} from '../../utils/consts'
// import {useTelegram} from '../../utils/tg/tg';


const Form = (props) => {


  // Установка состояния пароля
  const [formData, setFormData] = useState(props.pass);

  // Установка стандартной длинны
  const { rangeValueTable} = defoltConsts();
  const [range, setFromRange]= useState(rangeValueTable["0"]);

  // Обновление формы
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    // Если поле чекбокса, используем checked, в противном случае используем value
    const inputValue = type === 'checkbox' ? checked : parseInt(value);

    let newLen = 8
    if (name ==='delimiter' && checked === false) {
      setFromRange(rangeValueTable["0"]);
      newLen = formData.length
    } 
    if (name ==='delimiter' && checked === true) {
      newLen = rangeValueTable[formData.delimiter_value]["min"]
      setFromRange(rangeValueTable[formData.delimiter_value]);
    }

    if (name ==='delimiter_value') {
      newLen = rangeValueTable[value]["min"]
      setFromRange(rangeValueTable[value]);
    }

    if (name ==='delimiter' || name ==='delimiter_value') {
      setFormData({
        ...formData,
        [name]: inputValue,
        length: newLen,
      });
      props.onSavePass({
        ...formData,
        [name]: inputValue,
        length: newLen,
      });
      
      return
    }
    setFormData({
      ...formData,
      [name]: inputValue,
    });
    props.onSavePass({
      ...formData,
      [name]: inputValue,
    });
  };

  return (
    <form className={styles.selecters}>
      <label>
        Длина: {formData.length}
        <input
          className={styles.select_bar}
          type="range"
          name="length"
          min={range.min}
          max={range.max}
          step={range.step}
          value={formData.length}
          onChange={handleChange}
        />
      </label>
      <label className={styles.ch_lb}>
        Цифры:
        <input
          className={styles.ch_in}
          type="checkbox"
          name="numbers"
          checked={formData.numbers}
          onChange={handleChange}
        />
        <span className={styles.ch_sp}></span>
      </label>
      <label className={styles.ch_lb}>
        Заглавные буквы:
        <input
          className={styles.ch_in}
          type="checkbox"
          name="uppercase"
          checked={formData.uppercase}
          onChange={handleChange}
        />
        <span className={styles.ch_sp}></span>
      </label>
      <label className={styles.ch_lb}>
        Строчные буквы:
        <input
          className={styles.ch_in}
          type="checkbox"
          name="lowercase"
          checked={formData.lowercase}
          onChange={handleChange}
        />
        <span className={styles.ch_sp}></span>
      </label>
      <label className={styles.ch_lb}>
        Символы:
        <input
          className={styles.ch_in}
          type="checkbox"
          name="symbols"
          checked={formData.symbols}
          onChange={handleChange}
        />
        <span className={styles.ch_sp}></span>
      </label>
      <label className={styles.ch_lb}>
        Разделитель:
        <input
          className={styles.ch_in}
          type="checkbox"
          name="delimiter"
          checked={formData.delimiter}
          onChange={handleChange}
        />
        <span className={styles.ch_sp}></span>
          {formData.delimiter && (
          <select
            name="delimiter_value"
            value={formData.delimiter_value}
            onChange={handleChange}
          >
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        )}
      </label>
    </form>
  );
}

export default Form