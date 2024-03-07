import './App.css';
import React, {useEffect, useState } from "react";
import Form from './components/form';
import Head from './components/head';
import Name from './components/name';
import {useTelegram} from './utils/tg/tg';
import {defoltConsts} from './utils/consts'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';

function App() {
  
  const [swiper, setSwiper] = React.useState(null);

  // Подключение MainButton
  const {tg} = useTelegram();


  const mainBut = () => {
    if (swiper.activeIndex === 0) {
      swiper.slideNext();
      tg.BackButton.show();
      } else {
        // swiper.slidePrev();
        tg.close();
      }
  }

  const backBut  = () => {
    tg.BackButton.hide();
    swiper.slidePrev();
  }

  useEffect(() => {
    tg.ready();
    tg.expand();
    tg.MainButton.setParams({text: 'Далее'});
    tg.MainButton.show();
    tg.MainButton.onClick(mainBut);
    tg.BackButton.onClick(backBut);
    
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
    <Swiper className="mySwiper"
            noSwiping={true}
            noSwipingSelector='input'
            nested={true}
            onSwiper={(s) => {
            setSwiper(s);
            }}>
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
        <Name />
      </SwiperSlide>
    </Swiper>
  </div>
  );
}

export default App;
