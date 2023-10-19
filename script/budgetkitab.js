const [entryForm, deleteAllButton, yearSelect] = ['entryForm', 'deleteAllButton', 'year'].map(id => document.getElementById(id));
let currentYear = new Date().getFullYear();
let yearlyEntries = JSON.parse(localStorage.getItem('yearlyEntries')) || {};
yearlyEntries[currentYear] = yearlyEntries[currentYear] || [];
let entries = yearlyEntries[currentYear];
yearSelect.value = currentYear;

const updateLocalStorage = () => {
    localStorage.setItem('yearlyEntries', JSON.stringify(yearlyEntries));
};

const calculateBudget = () => {
    const totalSpent = entries.reduce((total, entry) => total + entry.price, 0);
    return 850 - totalSpent;
};

const displayEntries = () => {
    const entriesTable = document.getElementById('entries');
    while (entriesTable.rows.length > 1) entriesTable.deleteRow(1);
    entries.forEach((entry, index) => {
        let row = entriesTable.insertRow(-1);
        ['date', 'book', 'price'].forEach((key, i) => row.insertCell(i).textContent = entry[key]);
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<span class="material-symbols-rounded">delete_forever</span>';
        deleteButton.addEventListener('click', () => deleteEntry(index));
        row.insertCell(3).appendChild(deleteButton);
    });
    document.getElementById('budget').textContent = calculateBudget();
    updateBudgetColor();
};

const deleteEntry = index => {
    entries.splice(index, 1);
    yearlyEntries[currentYear] = entries;
    updateLocalStorage();
    displayEntries();
};

yearSelect.addEventListener('change', () => {
    currentYear = yearSelect.value;
    entries = yearlyEntries[currentYear] || [];
    displayEntries();
});

entryForm.addEventListener('submit', e => {
    e.preventDefault();
    let { date, book, price } = entryForm;
    price = Math.round(parseFloat(price.value));
    if (!date.value) date.value = new Date().toISOString().split('T')[0];
    entries.push({ date: date.value, book: book.value, price });
    yearlyEntries[currentYear] = entries;
    updateLocalStorage();
    displayEntries();
    entryForm.reset();
    let budget = calculateBudget();
    if (budget < 0) {
        alert('Warning: Your budget is now negative');
    }
});

deleteAllButton.addEventListener('click', () => {
    entries.length = 0;
    yearlyEntries[currentYear] = entries;
    updateLocalStorage();
    displayEntries();
});

const select = document.getElementById("year");
Array.from({ length: 6 }, (_, i) => i + 2023)
    .forEach(year => select.add(new Option(year, year)));

window.onload = displayEntries;

const updateBudgetColor = () => {
    const budgetElement = document.getElementById('budget');
    const budgetBoxElement = document.getElementById('BudgetBox');
    const budget = Number(budgetElement.textContent);
    const maxBudget = 850;
    const halfBudget = 425;

    const colors = {
        green: [0, 83, 102],
        orange: [230, 150, 1],
        red: [114, 13, 13]
    };

    const [color1, color2] = budget >= halfBudget ? [colors.orange, colors.green] : [colors.red, colors.orange];
    const ratio = budget >= halfBudget ? (budget - halfBudget) / (maxBudget - halfBudget) : budget / halfBudget;

    const interpolatedColor = interpolateColor(color1, color2, ratio).join(', ');

    budgetBoxElement.style.background = `rgb(${interpolatedColor})`;
};

const interpolateColor = (color1, color2, ratio) => color1.map((start, i) => Math.round(start + ratio * (color2[i] - start)));


