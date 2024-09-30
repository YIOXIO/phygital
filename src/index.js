import './index.css'
import './js/swiper'

const burgerMenu = document.querySelector('.burger-menu');
const mobileNav = document.querySelector('.navbar__list_menu')
const popupDocument = document.querySelector('.popup_document')
const buttonDocument = document.querySelectorAll('.regulation__card-button')
const iframeDocument = popupDocument.querySelector('.popup__iframe');
const buttonClosePopup = document.querySelector('.popup__close-button')



burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    mobileNav.classList.toggle('navbar__list_menu-active')
});




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



function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', handleOverlayClosePopup);
    document.addEventListener('keydown', handleEscClosePopup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', handleOverlayClosePopup);
    document.removeEventListener('keydown', handleEscClosePopup);
}

function handleOverlayClosePopup(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target)
    }
}

function handleEscClosePopup(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_opened'))
    }
}


buttonDocument.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); 
        const documentUrl = button.getAttribute('href'); 
        iframeDocument.src = documentUrl;
        openPopup(popupDocument); 
    });
});

buttonClosePopup.addEventListener('click', () => {
    closePopup(popupDocument)
})

const downloadButton = popupDocument.querySelector('.download-button');

// Обработчик события для кнопки "Скачать"
downloadButton.addEventListener('click', () => {
    const documentUrl = iframeDocument.src; 
    const filename = getFilenameFromUrl(documentUrl); 
    const decodedFilename = decodeURIComponent(filename); 
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = decodedFilename; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Функция для извлечения имени файла из URL
function getFilenameFromUrl(url) {
    const pathname = new URL(url).pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    return filename;
}