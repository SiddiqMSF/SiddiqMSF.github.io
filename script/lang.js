function applyTranslation(lang) {
    fetch('/languages/' + lang + '.json')
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(elem => {
                let key = elem.getAttribute('data-i18n');
                for(let i = 0; i < elem.childNodes.length; i++) {
                    if (elem.childNodes[i].nodeType === Node.TEXT_NODE) {
                        elem.childNodes[i].textContent = data[key] || elem.childNodes[i].textContent;
                        break;
                    }
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
