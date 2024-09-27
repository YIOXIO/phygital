import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Импортируем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Инициализация Swiper
const swiper = new Swiper('.swiper', {
  // Настройки Swiper
//   modules: [Autoplay] ,
  direction: 'horizontal', // Направление слайдера (горизонтальное или вертикальное)
  loop: false, // Бесконечный цикл
  speed: 400, // Скорость переключения слайдов (в миллисекундах)
  spaceBetween: 10, // Расстояние между слайдами (в пикселях)
  grabCursor:true,
  slidesPerView: 1,


  // Адаптивность
  breakpoints: {
    320: {
        slidesPerView: 1,
    },
    640: {
      slidesPerView: 1.2, // Количество видимых слайдов на экранах шириной 640px и более
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3.1, // Количество видимых слайдов на экранах шириной 1024px и более
    },
  },
});
