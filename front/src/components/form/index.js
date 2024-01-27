import styles from './style.module.css'
import Example from '../example/index.js';
import Complexity from '../complexity/index.js';
import React, { useCallback, useEffect, useState } from 'react';
import {useTelegram} from '../../utils/tg/tg';


const Form = (props) => {
  const [formData, setFormData] = useState(props.pass);
  const [range, setFromRange]= useState({
    min: 0,
    max: 64,
    step: 1
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    // Если поле чекбокса, используем checked, в противном случае используем value
    const inputValue = type === 'checkbox' ? checked : parseInt(value);

    const rangeValueTable = {
      "0": {min: 0,
        max: 64,
        step: 1},
      "4": {min: 4,
        max: 19,
        step: 5},
      "5": {min: 5,
        max: 23,
        step: 6},
      "6": {min: 6,
        max: 27,
        step: 7},
    }

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
      return
    }
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };


   

  return (
    <div className={styles.main} >
    <Example pass={formData}/>
    <Complexity />
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
      <hr></hr>
      <label>
        Цифры:
        <input
          type="checkbox"
          name="numbers"
          checked={formData.numbers}
          onChange={handleChange}
        />
      </label>
      <label>
        Заглавные буквы:
        <input
          type="checkbox"
          name="uppercase"
          checked={formData.uppercase}
          onChange={handleChange}
        />
      </label>
      <label>
        Строчные буквы:
        <input
          type="checkbox"
          name="lowercase"
          checked={formData.lowercase}
          onChange={handleChange}
        />
      </label>
      <label>
        Символы:
        <input
          type="checkbox"
          name="symbols"
          checked={formData.symbols}
          onChange={handleChange}
        />
      </label>
      <label>
        Разделитель:
        <input
          type="checkbox"
          name="delimiter"
          checked={formData.delimiter}
          onChange={handleChange}
        />
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
    </div>
  );
}

export default Form