
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', handleOverlayClosePopup);
    document.addEventListener('keydown', handleEscClosePopup);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', handleOverlayClosePopup);
    document.removeEventListener('keydown', handleEscClosePopup);
}

export function handleOverlayClosePopup(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target)
    }
}

export function handleEscClosePopup(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_opened'))
    }
}
