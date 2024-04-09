import { useEffect } from 'react';
import { useSwiper } from "swiper/react";
import { useTelegram } from '../../utils/tg/tg';


const Button = (props) => {

  const {tg} = useTelegram();
  const swiper = useSwiper();

  const id = tg.initDataUnsafe.user?.id;
  const name_pass = props.name
  const password = props.pass

  const changeColor = () => {
    const name = document.getElementById("name");
    const oldColor = name.style.borderColor;
    name.style.borderColor = 'red';
    setTimeout(() =>
    name.style.borderColor = oldColor, 2000);    
};

  const mainBut = () => {
      if (swiper.activeIndex === 1) {
          if (name_pass === '') {
            changeColor();
          } else {
            sendData();
            tg.close();
          }
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
      swiper.on('slideChange', updateButton);
  }, [tg, swiper]); // eslint-disable-line react-hooks/exhaustive-deps

  
  const sendData = () => {
    if (id === undefined) {
      return console.log('Errror get_id')
    }

    const data = {
      'id': id,
      'name_pass': name_pass,
      'password': password
    }

    var response = fetch('https://obrishti.ddns.net/webhook/template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })

    response.catch((err) => {
      console.log(err.message);
   });

  }

}


export default Button