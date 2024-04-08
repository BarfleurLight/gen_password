import { useEffect } from 'react';
import { useSwiper } from "swiper/react";
import {useTelegram} from '../../utils/tg/tg';


const Button = (props) => {

  const {tg} = useTelegram();
  const swiper = useSwiper();
  const id = tg.initDataUnsafe.user?.id;


  const mainBut = () => {
      if (swiper.activeIndex === 1) {
          sendData(props);
          tg.close();
      } else {
        swiper.slideNext("speed:", 900);
      }
  };

  const backBut = () => {
      swiper.slidePrev("speed:", 900);
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

  const sendData = (props) => {
    if (id === undefined) {
      return console.log('Errror get_id')
    }
    const data = {
      'id': id,
      'name_pass': props.name,
      'pass': props.pass
    }

    var response = fetch('https://obrishti.ddns.net/webhook/template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({test: 'Hello Mark'})
    })

    response.catch((err) => {
      console.log(err.message);
   });

  }

}


export default Button