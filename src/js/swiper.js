import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Импортируем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Инициализация Swiper
const swiper = new Swiper('.swiper', {
  // Настройки Swiper
  modules: [Autoplay] ,
  direction: 'horizontal', // Направление слайдера (горизонтальное или вертикальное)
  loop: false, // Бесконечный цикл
  speed: 400, // Скорость переключения слайдов (в миллисекундах)
  spaceBetween: 10, // Расстояние между слайдами (в пикселях)


  autoplay: {
    delay: 3000, // Задержка перед переключением (в миллисекундах)
    disableOnInteraction: false, // Не останавливать автопрокрутку при взаимодействии
  },

  // Адаптивность
  breakpoints: {
    320: {
        slidesPerView: 1.5,
    },
    640: {
      slidesPerView: 2, // Количество видимых слайдов на экранах шириной 640px и более
    },
    1024: {
      slidesPerView: 3.1, // Количество видимых слайдов на экранах шириной 1024px и более
    },
  },
});


const swiperNews = new Swiper('.swiper-news', {
  // Настройки Swiper
  modules: [Navigation, Pagination, Autoplay] ,
  direction: 'horizontal', // Направление слайдера (горизонтальное или вертикальное)
  loop: false, // Бесконечный цикл
  speed: 400, // Скорость переключения слайдов (в миллисекундах)
  spaceBetween: 10, // Расстояние между слайдами (в пикселях)


// Например, автопрокрутка
//   autoplay: {
//     delay: 3000, // Задержка перед переключением (в миллисекундах)
//     disableOnInteraction: false, // Не останавливать автопрокрутку при взаимодействии
//   },

  // Адаптивность
  breakpoints: {
    640: {
      slidesPerView: 2, // Количество видимых слайдов на экранах шириной 640px и более
    },
    1024: {
      slidesPerView: 3.1, // Количество видимых слайдов на экранах шириной 1024px и более
    },
  },
});