import styles from './style.module.css'
import React, { useState} from 'react';


const Name = (props) => {

    const [name, setName] = useState('')

    const onChangeName = (e) => {
        setName(e.target.value);
        props.onSaveName(e.target.value);
    }

      return (
        <div className={styles.nameform}>
            <input
                id = 'name'
                className={styles.input} 
                type='text' 
                placeholder={'Название шаблона'}
                value={name}
                onChange={onChangeName}
            />
        </div>
      );
};
export default Name