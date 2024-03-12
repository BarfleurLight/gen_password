import styles from './style.module.css'
import generateString from '../../utils/gen/gen.js'

const Example = (props) => {
  const length = props.pass['length']
  const width = Math.max(0, 410 - window.innerWidth) 
  const size = 40 - Math.max(0, (Math.log2(Math.max(1, (-14 + width / 18) + length)) * (5 + width / 100)))

  return (
    <div id='test' className={styles.example} style= {{fontSize: size } } >
      {generateString(props.pass)}
    </div>
  )
}

export default Example