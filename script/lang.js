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
            if (lang === 'ar') {
                document.body.setAttribute('dir', 'rtl');
                document.body.style.fontFamily = "'Almarai', sans-serif";
            } else {
                document.body.setAttribute('dir', 'ltr');
                document.body.style.fontFamily = "Product Sans";
            }
        });
}
