import { useEffect, useState } from 'react';
import { useSwiper } from "swiper/react";
import { useTelegram } from '../../utils/tg/tg';


const Button = (props) => {

  const {tg} = useTelegram();
  const swiper = useSwiper();
  const [activeIndex, setActiveIndex] = useState(swiper.activeIndex)

  const id = tg.initDataUnsafe.user?.id;

  const [data, setData] = useState({
    'id': id,
    'name_pass': props.name,
    'password': props.pass
  })

  useEffect(() => {
    setData(
      {
        'id': id,
        'name_pass': props.name,
        'password': props.pass
      }
    )
    }, [id, props]);


  const changeColor = () => {
    const name = document.getElementById("name");
    const oldColor = name.style.borderColor;
    name.style.borderColor = 'red';
    setTimeout(() =>
    name.style.borderColor = oldColor, 1000);    
  };


  useEffect(() => {
    const sendData = () => {
      if (data.id === undefined) {
        return console.log('Errror get_id')
      }

      console.log('data_ into sendData', data);
  
      var response = fetch('https://genpass.mvobr.ru/webhook/template', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
  
      response.catch((err) => {
        console.log(err.message);
     });
    };

    const mainBut = () => {
      console.log('INtomainBut', data);
      if (activeIndex === 1) {
        if (data.name_pass === '') {
          console.log('MB_None')
          changeColor();
        } else {
          console.log('Ok')
          sendData();
          tg.close();
        }
      } else {
        swiper.slideNext("speed:", 900);
      }
    };
    console.log('install MmainBut', data);
    tg.MainButton.onClick(mainBut);
    return () => {
      console.log('off MainBut');
      tg.MainButton.offClick(mainBut);
    };

  }, [tg, swiper, activeIndex, data]);

  // BackButton
useEffect(() => {
  if (activeIndex === 1) {
    console.log('swipe1')
    tg.BackButton.show()
  } else {
    console.log('swipe0')
    tg.BackButton.hide()
  }
}, [tg, swiper, activeIndex]);

  
  useEffect(() => {
    const backBut = () => {
      console.log('test0')
      swiper.slidePrev("speed:", 900);
      tg.BackButton.hide();
      };
    tg.BackButton.onClick(backBut);

    swiper.on('slideChange',() => {
      setActiveIndex(swiper.activeIndex)
    });
    return () => {
      tg.BackButton.offClick(backBut);
    };
    }, [tg, swiper]);

}


export default Button