import json from '../data.json';


function renderCards(documents, list) {
    const template = document.querySelector('.card-template');
    list.innerHTML = ''; // Очищаем список перед отрисовкой

    // Проверка на наличие массива и его непустоту
    if (documents && documents.length > 0) {
        documents.forEach(doc => {
            const card = template.content.cloneNode(true);
            const li = document.createElement('li');
            const description = card.querySelector('.regulation__card-description');
            const link = card.querySelector('.regulation__card-button');

            description.textContent = doc.description;
            link.href = doc.file;

            link.addEventListener('click', (event) => {
                event.preventDefault(); // Предотвращаем переход по ссылке
                const documentUrl = doc.file;
                iframeDocument.src = documentUrl;
                openPopup(popupDocument);
            });

            li.appendChild(card);
            list.appendChild(li);
        });
    }
}

function setupTabs(tabsData) {
    const tabsWrapper = document.querySelector('.tabs-wrapper');
    const sectionTitle = document.querySelector('.section-title');
    let activeTab = tabsWrapper.querySelector('.tabs-button_active');

    const tabsDocuments = document.querySelector('.tabs_documents .regulation__list');
    const tabsRegulation = document.querySelector('.tabs_regulation .regulation__list');

    tabsWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('tabs-button')) {
            activeTab.classList.remove('tabs-button_active');
            activeTab = event.target.parentElement;
            activeTab.classList.add('tabs-button_active');

            const tabTitle = event.target.textContent;
            sectionTitle.textContent = tabTitle;

            const tabData = tabsData.tabs.find(tab => tab.title === tabTitle);

            // Очищаем и заполняем оба списка
            if (tabsDocuments) {
                renderCards(tabData.documents, tabsDocuments);
            }

            if (tabsRegulation) {
                renderCards(tabData.regulation, tabsRegulation);
            }
        }
    });

    // Инициализация с первым табом
    const firstTab = tabsData.tabs[0];
    sectionTitle.textContent = firstTab.title;

    if (tabsDocuments) {
        renderCards(firstTab.documents, tabsDocuments);
    }

    if (tabsRegulation) {
        renderCards(firstTab.regulation, tabsRegulation);
    }
}

setupTabs(json);