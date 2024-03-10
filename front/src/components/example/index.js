import styles from './style.module.css'
import generateString from '../../utils/gen/gen.js'
import React, { useEffect } from 'react';

const Example = (props) => {
  const test = props.pass['length']
  


  return (
    <div id='test' className={styles.example} style= {{fontSize: `calc( ${40 - Math.max(0, (Math.log2(-15 + test) * 5)) }px )` }} >
      {generateString(props.pass)}
    </div>
  )
}

export default Example