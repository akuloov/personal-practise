import Swiper from 'swiper';
import 'swiper/css';

new Swiper('.swiper', {
    loop: true,

    autoplay: {
        delay: 4500,
    },

    slidesPerView: 2.5,

    spaceBetween: 20,
});