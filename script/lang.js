function applyTranslation(lang) {
    fetch('/languages/' + lang + '.json')
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(elem => {
                let key = elem.getAttribute('data-i18n');
                if (elem.childNodes[0].nodeType === Node.TEXT_NODE) {
                    elem.childNodes[0].textContent = data[key] || elem.childNodes[0].textContent;
                }
            });
        });
}
