import styles from './style.module.css';
import Example from '../example';
import Complexity from '../complexity';

const Head = (props) => {

  return (
      <div className={styles.head}>
        <Example pass={props.pass}/>
        <Complexity />
        <hr></hr>
      </div>
  )

}

export default Head