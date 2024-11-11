const popupDocument = document.querySelector('.popup_document')
const buttonDocument = document.querySelectorAll('.regulation__card-button')
const iframeDocument = popupDocument.querySelector('.popup__iframe');
const buttonClosePopup = document.querySelector('.popup__close-button')


import { openPopup, closePopup, handleEscClosePopup, handleOverlayClosePopup } from './js/popup';

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


import json from './experience.json';


function renderCards(documents, list, templateSelector) {
    const template = document.querySelector(templateSelector);
    list.innerHTML = ''; // Очищаем список перед отрисовкой

    // Проверка на наличие массива и его непустоту
    if (documents && documents.length > 0) {
        documents.forEach(doc => {
            let cardTemplateSelector = templateSelector;
            let fileExtension = null;

            // Определяем, какой шаблон использовать в зависимости от наличия url или расширения файла
            if (doc.url) {
                cardTemplateSelector = '.card-template_iframe';
            } else if (doc.file) {
                fileExtension = doc.file.split('.').pop().toLowerCase();
                if (['mp4', 'webp'].includes(fileExtension)) {
                    cardTemplateSelector = '.card-template_video';
                } else if (['pdf', 'docx', 'rtf'].includes(fileExtension)) {
                    cardTemplateSelector = '.card-template';
                }
            }

            const cardTemplate = document.querySelector(cardTemplateSelector);
            const card = cardTemplate.content.cloneNode(true);
            const li = document.createElement('li');
            const description = card.querySelector('.regulation__card-description');
            const link = card.querySelector('.regulation__card-button');
            const video = card.querySelector('video');
            const iframe = card.querySelector('iframe');

            description.textContent = doc.description;

            if (link) {
                if (fileExtension && ['docx', 'rtf'].includes(fileExtension)) {
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

            if (iframe) {
                iframe.src = doc.url;
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
                renderCards(tabData.material, tabsMaterial, '.card-template');
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
        renderCards(firstTab.material, tabsMaterial, '.card-template');
    }
}

setupTabs(json);
