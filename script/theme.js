(function () {
    var body = document.querySelector('body');
    var header = document.querySelector('header');
    var h2Span = document.querySelector('h2 span');
    var langSelector = document.querySelector('#lang-selector');
    var budgetBox = document.querySelector('#BudgetBox');
    var entryForm = document.querySelector('.entryForm');
    var formGroup = document.querySelector('.form-group');
    var select = document.querySelectorAll('select');
    var input = document.querySelectorAll('input');
    var entriesThTd = document.querySelectorAll('#entries th, #entries td');
    var entriesButton = document.querySelectorAll('#entries button');
    var td = document.querySelectorAll('td');

    var toggleSwitch = document.querySelector('#themeToggle');

    toggleSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.style.background = 'black';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.10)';
            h2Span.style.color = '#c1c1c1';
            langSelector.style.color = 'white';
            budgetBox.style.backgroundColor = 'rgba(255, 255, 255, 0.10)';
            entryForm.style.backgroundColor = 'rgba(255, 255, 255, 0.10)';
            entryForm.style.color = 'white';
            formGroup.style.color = 'white';
            select.style.color = 'white';
            input.style.backgroundColor = 'rgba(255, 255, 255, 0.10)';
            input.style.color = 'white';
            entriesThTd.forEach(el => el.style.border = 'white');
            entriesButton.forEach(el => el.style.backgroundColor = 'rgba(255, 255, 255, 0.10)');
            td.style.backgroundColor = 'rgba(255, 255, 255, 0.10)';
            td.style.color = 'white';
        } else {
            body.style.background = 'white';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.832)';
            h2Span.style.color = '#005366';
            langSelector.style.color = '';
            budgetBox.style.backgroundColor = '#ffffff9e';
            entryForm.style.backgroundColor = '#ffffff9e';
            entryForm.style.color = '';
            formGroup.style.color = '';
            select.style.color = '';
            input.style.backgroundColor = '';
            input.style.color = '';
            entriesThTd.forEach(el => el.style.border = '1px solid #dddddd7a');
            entriesButton.forEach(el => el.style.backgroundColor = '');
            td.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            td.style.color = '';
        }
    });
})();
