const [entryForm, deleteAllButton, yearSelect] = ['entryForm', 'deleteAllButton', 'year'].map(id => document.getElementById(id));
let [currentYear, yearlyBudgets, yearlyEntries] = [new Date().getFullYear(), JSON.parse(localStorage.getItem('yearlyBudgets')) || {}, JSON.parse(localStorage.getItem('yearlyEntries')) || {}];
let [budget, entries] = [yearlyBudgets[currentYear] ||= 850, yearlyEntries[currentYear] ||= []];

const updateLocalStorage = () => {
    localStorage.setItem('yearlyEntries', JSON.stringify(yearlyEntries));
    localStorage.setItem('yearlyBudgets', JSON.stringify(yearlyBudgets));
};

const displayEntries = () => {
    const entriesTable = document.getElementById('entries');
    const rows = entriesTable.getElementsByTagName('tr');
    while (rows.length > 1) entriesTable.deleteRow(1);
    entries.forEach((entry, index) => {
        let row = entriesTable.insertRow(-1);
        ['date', 'book', 'price'].forEach((key, i) => row.insertCell(i).textContent = entry[key]);
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<span class="material-symbols-rounded">delete_forever</span>';
        deleteButton.addEventListener('click', () => deleteEntry(index));
        row.insertCell(3).appendChild(deleteButton);
    });
    document.getElementById('budget').textContent = budget;
    updateBudgetColor();
};


const deleteEntry = index => {
    budget += Math.round(Number(entries[index].price));
    entries.splice(index, 1);
    yearlyEntries[currentYear] = entries;
    yearlyBudgets[currentYear] = budget;
    updateLocalStorage();
    displayEntries();
};

yearSelect.addEventListener('change', () => {
    currentYear = yearSelect.value;
    budget = yearlyBudgets[currentYear] ||= 850;
    entries = yearlyEntries[currentYear] ||= [];
    displayEntries();
});

entryForm.addEventListener('submit', e => {
    e.preventDefault();
    let { date, book, price } = entryForm;
    price = Math.round(parseFloat(price.value));

    if (!date.value) date.value = new Date().toISOString().split('T')[0];

    if (budget - price >= 0) {
        entries.push({ date: date.value, book: book.value, price });
        yearlyEntries[currentYear] = entries;
        budget -= price;
        yearlyBudgets[currentYear] = budget;
        updateLocalStorage();
        displayEntries();
        entryForm.reset();
    } else alert('Invalid entry or insufficient budget');
});

deleteAllButton.addEventListener('click', () => {
    entries.length = budget = yearlyBudgets[currentYear] = 850;
    yearlyEntries[currentYear] = entries;
    updateLocalStorage();
    displayEntries();
});

Array.from({ length: 6 }, (_, i) => i + currentYear)
    .forEach(year => yearSelect.add(new Option(year, year)));

window.onload = displayEntries;

const updateBudgetColor = () => {
    const budgetElement = document.getElementById('budget');
    const colors = { green: [0, 128, 0], orange: [255, 165, 0], red: [255, 0, 0] };
    let color;

    color = budget >= 850 ? 'green' : budget <= 0 ? 'red' : (() => {
        const percentGreen = budget / 850;
        const [startColor, endColor] = percentGreen <= 0.5 ? ['red', 'orange'] : ['orange', 'green'];
        const mixedRGB = colors[startColor].map((val, i) => Math.round(val * (1 - percentGreen * 2) + colors[endColor][i] * percentGreen * 2));
        return `rgb(${mixedRGB.join(',')})`;
    })();

    budgetElement.style.color = color;
};