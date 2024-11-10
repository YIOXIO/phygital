import './index.css';
import './js/swiper';
import { openPopup, closePopup, handleEscClosePopup, handleOverlayClosePopup } from './js/popup';


const burgerMenu = document.querySelector('.burger-menu');
const mobileNav = document.querySelector('.navbar__list_menu')
const popupDocument = document.querySelector('.popup_document')
const buttonDocument = document.querySelectorAll('.regulation__card-button')
const iframeDocument = popupDocument.querySelector('.popup__iframe');
const buttonClosePopup = document.querySelector('.popup__close-button')
const downloadButton = popupDocument.querySelector('.download-button');


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


function downloadFile(){
    const documentUrl = iframeDocument.src; 
    const filename = getFilenameFromUrl(documentUrl); 
    const decodedFilename = decodeURIComponent(filename); 
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = decodedFilename; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Обработчик события для кнопки "Скачать"
downloadButton.addEventListener('click', () => {
    downloadFile()
});

// Функция для извлечения имени файла из URL
function getFilenameFromUrl(url) {
    const pathname = new URL(url).pathname;
    const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
    return filename;
}



import json from './data.json';

function renderCards(documents, list, templateSelector) {
    const template = document.querySelector(templateSelector);
    list.innerHTML = ''; // Очищаем список перед отрисовкой

    // Проверка на наличие массива и его непустоту
    if (documents && documents.length > 0) {
        documents.forEach(doc => {
            let cardTemplateSelector = templateSelector;

            // Определяем, какой шаблон использовать в зависимости от расширения файла
            const fileExtension = doc.file.split('.').pop().toLowerCase();
            if (['mp4', 'webp'].includes(fileExtension)) {
                cardTemplateSelector = '.card-template_video';
            } else if (['pdf', 'docx', 'rtf'].includes(fileExtension)) {
                cardTemplateSelector = '.card-template';
            }

            const cardTemplate = document.querySelector(cardTemplateSelector);
            const card = cardTemplate.content.cloneNode(true);
            const li = document.createElement('li');
            const description = card.querySelector('.regulation__card-description');
            const link = card.querySelector('.regulation__card-button');
            const video = card.querySelector('video');

            description.textContent = doc.description;

            if (link) {
                if (['docx', 'rtf'].includes(fileExtension)) {
                    link.textContent = 'Скачать';
                    link.href = doc.file;
                    link.target = '_blank'; // Открываем файл в новой вкладке
                } else {
                    link.textContent = 'Открыть';
                    link.href = '#'; // Убираем ссылку, чтобы не было перехода
                    link.addEventListener('click', (event) => {
                        event.preventDefault(); // Предотвращаем переход по ссылке
                        const documentUrl = doc.file;
                        iframeDocument.src = documentUrl;
                        openPopup(popupDocument);
                    });
                }
            }

            if (video) {
                video.src = doc.file;
                video.poster = doc.poster || '';
            }

            li.appendChild(card);
            list.appendChild(li);
        });
    }
}

function setupTabs(tabsData) {
    const tabsWrapper = document.querySelector('.tabs-wrapper');
    let activeTab = tabsWrapper.querySelector('.tabs-button_active');

    const tabsDocuments = document.querySelector('.tabs_documents .regulation__list');
    const tabsRegulation = document.querySelector('.tabs_regulation .regulation__list');
    const tabsMaterial = document.querySelector('.tabs_material .regulation__list'); 
    const tabsAdditionally = document.querySelector('.tabs_additionally .regulation__list'); 

    tabsWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('tabs-button')) {
            activeTab.classList.remove('tabs-button_active');
            activeTab = event.target.parentElement;
            activeTab.classList.add('tabs-button_active');

            const tabIndex = Array.from(tabsWrapper.children).indexOf(activeTab);
            const tabData = tabsData.tabs[tabIndex];

            // Очищаем и заполняем все списки
            if (tabsDocuments) {
                renderCards(tabData.documents, tabsDocuments, '.card-template');
            }

            if (tabsRegulation) {
                renderCards(tabData.regulation, tabsRegulation, '.card-template');
            }

            if (tabsMaterial) {
                renderCards(tabData.material, tabsMaterial, '.card-template_video');
            }
            if (tabsAdditionally) {
                renderCards(tabData.additionally, tabsAdditionally, '.card-template');
            }
        }
    });

    // Инициализация с первым табом
    const firstTab = tabsData.tabs[0];
    if (tabsDocuments) {
        renderCards(firstTab.documents, tabsDocuments, '.card-template');
    }

    if (tabsRegulation) {
        renderCards(firstTab.regulation, tabsRegulation, '.card-template');
    }

    if (tabsMaterial) {
        renderCards(firstTab.material, tabsMaterial, '.card-template_video');
    }
    if (tabsAdditionally) {
        renderCards(firstTab.additionally, tabsAdditionally, '.card-template');
    }
}

setupTabs(json);


import Swiper from 'swiper';


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




document.addEventListener('DOMContentLoaded', () => {
    const tabsWrapper = document.querySelector('.tabs-wrapper');
    const tabs = document.querySelectorAll('.tabs-button');
    let isDragging = false;
    let startX, scrollLeft;

    tabsWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        tabsWrapper.classList.add('grabbing');
        startX = e.pageX - tabsWrapper.offsetLeft;
        scrollLeft = tabsWrapper.scrollLeft;
    });

    tabsWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        tabsWrapper.classList.remove('grabbing');
    });

    tabsWrapper.addEventListener('mouseup', () => {
        isDragging = false;
        tabsWrapper.classList.remove('grabbing');
    });

    tabsWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - tabsWrapper.offsetLeft;
        const walk = (x - startX) * 2; // Умножаем на 2 для более быстрого скролла
        tabsWrapper.scrollLeft = scrollLeft - walk;
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabRect = tab.getBoundingClientRect();
            const tabsWrapperRect = tabsWrapper.getBoundingClientRect();
            const isFirstVisible = tabRect.left < tabsWrapperRect.left;
            const isLastVisible = tabRect.right > tabsWrapperRect.right;
            if (isFirstVisible) {
                tabsWrapper.scrollBy({
                    left: -300, // Сдвиг на 75px влево
                    behavior: 'smooth' // Плавный скролл
                });
            } else if (isLastVisible) {
                tabsWrapper.scrollBy({
                    left: 300, // Сдвиг на 75px вправо
                    behavior: 'smooth' // Плавный скролл
                });
            }
        
        });
    });
});