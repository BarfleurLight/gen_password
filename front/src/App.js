import './App.css';
import Example from './components/example';
import Complexity from './components/complexity';
import Form from './components/form';
import Button from './components/button/button';
import { useTg } from './utils/tg/tg';


function App() {
  const pass = {
    length: 8,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true,
    delimiter: false,
    delimiter_value: 4,
  }
  
  const {onMainButton} = useTg()

  return (
    <div className="App">
      <Form pass={pass}/>
      {onMainButton}
    </div>
  );
}

export default App;
