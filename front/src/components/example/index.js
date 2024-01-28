import styles from './style.module.css'
import generateString from '../../utils/gen/gen.js'
import React, { useState } from 'react';

const Example = (props) => {
  return (
    <div className={styles.example}>
      {generateString(props.pass)}
    </div>
  )
}

export default Example