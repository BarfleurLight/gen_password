import styles from './style.module.css'
import React, { useState, useEffect} from 'react';
import { useSwiper } from "swiper/react";
import {useTelegram} from '../../utils/tg/tg';

const Name = (props) => {
    const [name, setName] = useState('')

    const {tg} = useTelegram();
    const swiper = useSwiper();

    
    const mainBut = (s) => {
        if (s.sactiveIndex === 0) {
            s.slideNext();
        } else {
            tg.close()
        }
    };

    const backBut = (s) => {
        console.log(swiper.activeIndex);
        s.slidePrev("speed:", 50);
        tg.BackButton.hide();
    };

    const updateButton = (s) => {
        if (swiper.activeIndex === 0) {
            tg.MainButton.onClick(mainBut(s));
            tg.BackButton.hide()
        } else {            
            tg.BackButton.show()
        }
    }

    useEffect(() => {
        updateButton(swiper);
        tg.BackButton.onClick(backBut(swiper));
        swiper.on('slideChange', function () {
            // console.log(swiper.activeIndex);
            updateButton(swiper);
          });
    }, [swiper]);
    


    const onChangeName = (e) => {
        setName(e.target.value)
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