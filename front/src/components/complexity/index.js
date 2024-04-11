import styles from './style.module.css';

const Complexity = (props) => {

  const pass = props.pass

  const complex = () => {
    const len = pass.length
    let result = 0
    let countSymbol = 0
    const max = 20 * Math.log2(80)

    //bool
    const lowercase = pass.lowercase
    const numbers = pass.numbers
    const uppercase = pass.uppercase
    const symbols = pass.symbols
    const delimiter = pass.delimiter

    if (lowercase){
      countSymbol += 20
    }
    if (numbers){
      countSymbol += 20
    }
    if (uppercase){
      countSymbol += 20
    }
    if (symbols){
      countSymbol += 20
    }
    if (delimiter){
      countSymbol += 5
    }

    result = (len * Math.log2(countSymbol) / max) * 100
    if (result >= 100) {
      return 100
    }
    return result
  }

  const getColor = (value) => {
    if (value < 40) {
      return "Red"
    }
    if (value < 80) {
      return "Orange"
    }
    return "Green"
  }


  return (
    <div className={styles.progressbar_div}>
      <div className={styles.progressbar}>
        <div className={styles.progressbarfill} style={{'width': `${complex()}%`, 'background-color':getColor(complex())}}></div>
     </div>
    </div>
  )

}

export default Complexity