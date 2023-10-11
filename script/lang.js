function applyTranslation(lang) {
    fetch(lang + '.json')
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(elem => {
                elem.textContent = data[elem.textContent.trim()] || elem.textContent;
            });
        });
}