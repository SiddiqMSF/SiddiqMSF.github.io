window.onload = function() {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        if (elem.childNodes[0].nodeType === Node.TEXT_NODE) {
            elem.setAttribute('data-original', elem.childNodes[0].textContent);
        }
    });
}

function applyTranslation(lang) {
    if (lang === 'en') {
        document.querySelectorAll('[data-i18n]').forEach(elem => {
            let original = elem.getAttribute('data-original');
            if (elem.childNodes[0].nodeType === Node.TEXT_NODE) {
                elem.childNodes[0].textContent = original;
            }
        });
    } else {
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
}
