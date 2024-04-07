// import styles from './style.module.css'
import React, { useEffect} from 'react';
import { useSwiper } from "swiper/react";
import {useTelegram} from '../../utils/tg/tg';


const Button = (props) => {
  const {tg} = useTelegram();
  const swiper = useSwiper();

  const mainBut = () => {
      if (swiper.activeIndex === 1) {
          tg.close();
      } else {
          swiper.slideNext("speed:", 100);
      }
  };

  const backBut = () => {
      swiper.slidePrev("speed:", 100);
      tg.BackButton.hide();
  };

  const updateButton = () => {
      if (swiper.activeIndex === 1) {
        console.log(swiper.activeIndex);
        tg.BackButton.show()
        tg.MainButton.onClick(mainBut);
      } else { 
        tg.MainButton.onClick(mainBut);
        tg.BackButton.hide()
      }
  }

  useEffect(() => {
      tg.BackButton.onClick(backBut);
      tg.MainButton.onClick(mainBut);
      swiper.on('slideChange', function () {
          // console.log(swiper.activeIndex);
          updateButton();
        });
  }, [tg, swiper]);

  const sendData = () => {

  }
}


export default Button