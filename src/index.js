import './index.css'
import './js/swiper'

const burgerMenu = document.querySelector('.burger-menu');
const mobileNav = document.querySelector('.navbar__list_menu')

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    mobileNav.classList.toggle('navbar__list_menu-active')
});

// let prevScrollPos = window.scrollY;
// const navbar = document.querySelector('.navbar');
// const scrollThreshold = 35; 

// window.onscroll = function() {
//     const currentScrollPos = window.scrollY;

//     if (currentScrollPos <= scrollThreshold) {

//         navbar.classList.remove('hidden');
//     } else {
//         if (prevScrollPos > currentScrollPos) {

//             navbar.classList.remove('hidden');
//         } else {

//             navbar.classList.add('hidden');
//         }
//     }

//     prevScrollPos = currentScrollPos;
// }


let prevScrollPos = window.scrollY;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 35; // Порог в 35 пикселей

function handleScroll() {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos <= scrollThreshold) {
        navbar.classList.remove('hidden');
    } else {
        if (prevScrollPos > currentScrollPos) {
            navbar.classList.remove('hidden');
        } else {
            navbar.classList.add('hidden');
        }
    }

    prevScrollPos = currentScrollPos;
}

function handleScreenSize() {
    if (window.innerWidth <= 1200) {
        window.addEventListener('scroll', handleScroll);
    } else {
        window.removeEventListener('scroll', handleScroll);
        navbar.classList.remove('hidden');
    }
}

// Инициализация при загрузке страницы
handleScreenSize();

// Обновление при изменении размера окна
window.addEventListener('resize', handleScreenSize);