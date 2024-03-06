import './App.css';
import React, {useEffect, useState } from "react";
import Form from './components/form';
import Head from './components/head';
import {useTelegram} from './utils/tg/tg';
import {defoltConsts} from './utils/consts'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function App() {
  
  const [swiper, setSwiper] = React.useState(null);

  // Подключение MainButton
  const {tg} = useTelegram();

  const mainBut = () => {
    if (swiper.activeIndex === 0) {
      swiper.slideNext();
      tg.BackButton.isVisible(true)
      } else {
        // swiper.slidePrev();
        tg.close();
      }
  }

  const backBut  = () => {
    tg.BackButton.isVisible(false);
    swiper.slidePrev();
  }

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.MainButton.setParams({text: 'Далее'});
    tg.MainButton.show();
    tg.MainButton.onClick(mainBut);
    tg.BackButton.onClick(backBut);
    
    // tg.onEvent('mainButtonClicked', sendDataToTelegram)
    // return () => {
    //   tg.offEvent('mainButtonClicked', sendDataToTelegram)
    // }
  }, [mainBut, backBut])

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
    <Swiper className="mySwiper" 
            onSwiper={(s) => {
            setSwiper(s);
            }}>
      <SwiperSlide virtualIndex={0}>
        <Head pass={Password}/>
        <Form onSavePass={savePassword} pass={Password}/>
      </SwiperSlide>
      <SwiperSlide virtualIndex={1}>        
        <Head pass={Password}/>
        </SwiperSlide>
    </Swiper>
  </div>
  );
}

export default App;
