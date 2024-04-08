import { useEffect } from 'react';
import { useSwiper } from "swiper/react";
import {useTelegram} from '../../utils/tg/tg';


const Button = (props) => {
  const {tg} = useTelegram();
  const swiper = useSwiper();


  try {
    var id = tg.initDataUnsafe.user.id
  } catch (err) {
    var id = 'Error'
  }

  const mainBut = () => {
      if (swiper.activeIndex === 1) {
          tg.close();
      } else {
        swiper.slideNext("speed:", 400);
      }
  };

  const backBut = () => {
      swiper.slidePrev("speed:", 400);
      tg.BackButton.hide();
  };

  const updateButton = () => {
      if (swiper.activeIndex === 1) {
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
          console.log(id)
          // console.log(swiper.activeIndex);
          updateButton();
        });
  }, [tg, swiper]);

  const sendData = () => {

  }
}


export default Button