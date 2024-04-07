import styles from './style.module.css'
import React, { useState} from 'react';
// import { useSwiper } from "swiper/react";
// import {useTelegram} from '../../utils/tg/tg';

const Name = (props) => {

    const [name, setName] = useState('')

    // const {tg} = useTelegram();
    // const swiper = useSwiper();

    // const mainBut = () => {
    //     if (swiper.activeIndex === 1) {
    //         tg.close();
    //     } else {
    //         swiper.slideNext("speed:", 100);
    //     }
    // };

    // const backBut = () => {
    //     swiper.slidePrev("speed:", 100);
    //     tg.BackButton.hide();
    // };

    // const updateButton = () => {
    //     if (swiper.activeIndex === 1) {
    //         tg.BackButton.show()
    //         tg.MainButton.onClick(mainBut);
    //     } else {        
    //         tg.MainButton.onClick(mainBut);
    //         tg.BackButton.hide()
    //     }
    // }

    // useEffect(() => {
    //     tg.BackButton.onClick(backBut);
    //     tg.MainButton.onClick(mainBut);
    //     swiper.on('slideChange', function () {
    //         // console.log(swiper.activeIndex);
    //         updateButton();
    //       });
    // }, [tg, swiper]);

    const onChangeName = (e) => {
        setName(e.target.value);
        props.onSaveName(e.target.value);
    }

      return (
        <div className={styles.nameform}>
            <input
                className={styles.input} 
                type='text' 
                placeholder={'Название шаблона'}
                value={name}
                onChange={onChangeName}
            />
        </div>
      );
};
export default Name