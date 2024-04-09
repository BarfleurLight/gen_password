import { useEffect, useCallback, useState } from 'react';
import { useSwiper } from "swiper/react";
import { useTelegram } from '../../utils/tg/tg';


const Button = (props) => {

  const {tg} = useTelegram();
  const swiper = useSwiper();

  // const id = useState(tg.initDataUnsafe.user?.id);
  const name_pass= useState(props.name);
  const password = useState(props.pass);

  const [activeIndex, setActiveIndex] = useState(swiper.activeIndex)


  // const id = tg.initDataUnsafe.user?.id;

  // const name_pass = props.name
  // const password = props.pass

  // const data = {
  //   'id': tg.initDataUnsafe.user?.id,
  //   'name_pass': props.name,
  //   'password': props.pass
  // }
  const updateData = useCallback(() => {
    const data = {
        'id': tg.initDataUnsafe.user?.id,
        'name_pass': name_pass,
        'password': password
      }
      return data
  }, [tg, name_pass, password]);


  const changeColor = () => {
    const name = document.getElementById("name");
    const oldColor = name.style.borderColor;
    name.style.borderColor = 'red';
    setTimeout(() =>
    name.style.borderColor = oldColor, 1000);    
  };


  // const mainBut = () => {
  //     if (swiper.activeIndex === 1) {
  //         if (name_pass === '') {
  //           changeColor();
  //         } else {
  //           sendData();
  //           tg.close();
  //         }
  //     } else {
  //       swiper.slideNext("speed:", 900);
  //     }
  // };

  // MainButton
  useEffect(() => {
    const data = updateData()
    const sendData = () => {
      if (data.id === undefined) {
        return console.log('Errror get_id')
      }

      console.log(data)
  
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

    const mainBut = () => {
      if (swiper.activeIndex === 1) {
        if (data.name_pass === '') {
          changeColor();
        } else {
          sendData();
          tg.close();
        }
      } else {
        swiper.slideNext("speed:", 900);
      }
    };
    tg.MainButton.onClick(mainBut);
  }, [tg, swiper, updateData, activeIndex]);

  // BackButton
useEffect(() => {
  const backBut = () => {
    console.log('test0')
    swiper.slidePrev("speed:", 900);
    tg.BackButton.hide();
    };
  if (activeIndex === 1) {
    console.log('test1')
    tg.BackButton.show()
    tg.MainButton.onClick(backBut);
  } else {
    console.log('test2')
    tg.BackButton.hide()
  }
}, [tg, swiper, activeIndex]);


  // const updateButton = () => {
  //     if (swiper.activeIndex === 1) {
  //       console.log(name_pass)
  //       tg.BackButton.show()
  //       tg.MainButton.onClick(mainBut);
  //     } else {
  //       tg.MainButton.onClick(mainBut);
  //       tg.BackButton.hide()
  //     }
  // }
  
  useEffect(() => {
    swiper.on('slideChange',() => {
      setActiveIndex(swiper.activeIndex)
    });
    }, [swiper]);

  
  // const sendData = () => {
  //   if (id === undefined) {
  //     return console.log('Errror get_id')
  //   }

  //   const data = {
  //     'id': id,
  //     'name_pass': name_pass,
  //     'password': password
  //   }
  //   console.log(data)

  //   var response = fetch('https://obrishti.ddns.net/webhook/template', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify(data)
  //   })

  //   response.catch((err) => {
  //     console.log(err.message);
  //  });

  // }
}


export default Button