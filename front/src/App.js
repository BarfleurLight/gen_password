import './App.css';
import React, {useEffect, useState } from "react";
import Form from './components/form';
import Head from './components/head';
import {useTelegram} from './utils/tg/tg';
import {defoltConsts} from './utils/consts'

function App() {
  
  // Подключение MainButton
  const {tg} = useTelegram();
  useEffect(() => {
    tg.ready();
    tg.MainButton.setParams({text: 'Создать шаблон'});
    tg.MainButton.show();
  }, [])
  
  //Стандартные параметры паароля
  const {defolt_pass} = defoltConsts();

  const [Password, setPassword] = useState(defolt_pass);
  const savePassword = (initDataPass) =>
  { 
    setPassword({
      ...initDataPass,
    })
  };

  return (
    <div className="App">
      <Head pass={Password}/>
      <Form onSavePass={savePassword} pass={Password}/>
    </div>
  );
}

export default App;
