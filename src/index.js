import './index.css'
import './js/swiper'

const burgerMenu = document.querySelector('.burger-menu');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
});


// function updateSVGPath(value) {
//     const svgPath = document.querySelector('#dynamic-svg path');
//     const dAttribute = svgPath.getAttribute('d');
//     const newValue = dAttribute.replace(/40(?=\s)/, value);
//     svgPath.setAttribute('d', newValue);
// }

// function handleResize() {
//     const screenWidth = window.innerWidth;
//     const newValue = Math.floor(screenWidth / 40); // Пример вычисления нового значения
//     updateSVGPath(newValue);
// }

// window.addEventListener('resize', handleResize);

// // Инициализация при загрузке страницы
// handleResize();

