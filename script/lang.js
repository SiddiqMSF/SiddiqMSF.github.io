function applyTranslation(lang) {
    fetch('languages/' + lang + '.json')
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(elem => {
                let key = elem.getAttribute('data-i18n');
                elem.textContent = data[key] || elem.textContent;
            });
        });
}
