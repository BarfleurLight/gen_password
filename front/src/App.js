import './App.css';
import {useEffect} from "react";
import Example from './components/example';
import Complexity from './components/complexity';
import Form from './components/form';
import Button from './components/button/button';
import {useTelegram} from './utils/tg/tg';


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

  const {tg} = useTelegram();
 //Это работает
  useEffect(() => {
    tg.ready();
    tg.MainButton.setParams({text: 'Создать шаблон'});
    tg.MainButton.show();
  }, [])

  return (
    <div className="App">
      <Form pass={pass}/>
    </div>
  );
}

export default App;
