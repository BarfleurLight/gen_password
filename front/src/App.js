import './App.css';
import React, {useEffect, useState } from "react";
import Form from './components/form';
import Head from './components/head';
import Name from './components/name';
import Button from './components/button/button';
import {useTelegram} from './utils/tg/tg';
import {defoltConsts} from './utils/consts'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

function App() {

  const {tg} = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.MainButton.setParams({text: 'Далее'});
    tg.MainButton.show();
  }, [tg])

  //Стандартные параметры паароля
  const {defolt_pass} = defoltConsts();

  const [Password, setPassword] = useState(defolt_pass);
  const savePassword = (initDataPass) =>
  { 
    setPassword({
      ...initDataPass,
    })
  };

  const [Name_pass, setName_pass] = useState('');

  const saveName = (initName) =>
  {setName_pass(initName)};

  return (
  <div className="App">
    <Swiper className="mySwiper"
            noSwiping={true}
            noSwipingSelector='input'
            nested={true}>
      <SwiperSlide virtualIndex={0}>
        <Head pass={Password} slot="container-start"/>
        <Swiper 
          direction={'vertical'}
          slidesPerView={'auto'}
          freeMode={true}
          mousewheel={true}
          nested={true}
          modules={[FreeMode, Scrollbar, Mousewheel]}
          className="vertslider"
        >
          <SwiperSlide >
            <Form onSavePass={savePassword} pass={Password} />
          </SwiperSlide>
        </Swiper>
      </SwiperSlide>
      <SwiperSlide virtualIndex={1}>        
        <Head pass={Password}/>
        <Name onSaveName={saveName} />
        <Button pass={Password} name={Name_pass}/>
      </SwiperSlide>
    </Swiper>
  </div>
  );
}

export default App;
