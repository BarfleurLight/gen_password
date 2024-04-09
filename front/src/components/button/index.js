import { useEffect, useState } from 'react';
import { useSwiper } from "swiper/react";
import { useTelegram } from '../../utils/tg/tg';


const Button = (props) => {

  const {tg} = useTelegram();
  const swiper = useSwiper();
  const [activeIndex, setActiveIndex] = useState(swiper.activeIndex)

  const id = tg.initDataUnsafe.user?.id;

  

  // const id = useState(tg.initDataUnsafe.user?.id);
  // const name_pass= useState(props.name);
  // const [password] = useState(props.pass);

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

  // const id = tg.initDataUnsafe.user?.id;

  // const name_pass = props.name
  // const password = props.pass

  // const data = {
  //   'id': tg.initDataUnsafe.user?.id,
  //   'name_pass': props.name,
  //   'password': props.pass
  // }
  // const updateData = useCallback(() => {
  //   const data = {
  //       'id': tg.initDataUnsafe.user?.id,
  //       'name_pass': props.name,
  //       'password': props.pass
  //     }
  //     return data
  // }, [tg, props]);


  const changeColor = () => {
    const name = document.getElementById("name");
    const oldColor = name.style.borderColor;
    name.style.borderColor = 'red';
    setTimeout(() =>
    name.style.borderColor = oldColor, 1000);    
  };


  const mainBut = () => {
      if (activeIndex === 1) {
          if (data.name_pass === '') {
            changeColor();
          } else {
            sendData(data);
            tg.close();
          }
      } else {
        swiper.slideNext("speed:", 900);
      }
  };

  tg.MainButton.onClick(mainBut)

  // MainButton
  // useEffect(() => {
  //   const sendData = (data) => {
  //     if (data.id === undefined) {
  //       return console.log('Errror get_id')
  //     }

  //     console.log('data_ into sendData', data);
  
  //     var response = fetch('https://obrishti.ddns.net/webhook/template', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8'
  //       },
  //       body: JSON.stringify(data)
  //     })
  
  //     response.catch((err) => {
  //       console.log(err.message);
  //    });
  //   };

  //   const mainBut0 = (data) => {
  //     if (data.name_pass === '') {
  //       console.log('MB_None')
  //       changeColor();
  //     } else {
  //       console.log('Ok')
  //       sendData(data);
  //       tg.close();
  //     }
  //   };

  //   const mainBut1 = () => {
  //     swiper.slideNext("speed:", 900);
  //   };

  // if (activeIndex === 1) {
  //     console.log('testsssssss0')
  //     tg.MainButton.onClick(() => {
  //       mainBut0(data)
  //     });
  //   } else {
  //     console.log('testsssssss1')
  //     tg.MainButton.onClick(() => {
  //       mainBut1()
  //     });
  //   }
  // }, [tg, swiper, activeIndex, data]);

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
    const backBut = () => {
      console.log('test0')
      swiper.slidePrev("speed:", 900);
      tg.BackButton.hide();
      };
    tg.BackButton.onClick(backBut);

    swiper.on('slideChange',() => {
      setActiveIndex(swiper.activeIndex)
    });

    }, [tg, swiper]);


  // useEffect(() => {
  //   tg.MainButton.onClick(mainBut)
  // }, []);


  const sendData = () => {
    if (id === undefined) {
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
}


export default Button