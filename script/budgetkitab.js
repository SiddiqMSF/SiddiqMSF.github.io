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

entryForm.addEventListener('submit', e => {
    e.preventDefault();
    let { date, book, price } = entryForm;
    price = Math.round(parseFloat(price.value));
    if (!date.value) date.value = new Date().toISOString().split('T')[0];
    
    // Calculate new budget before adding entry
    const newBudget = calculateBudget() - price;
    
    if (newBudget < 0) {
        alert('Warning: Your budget is now negative');
    }
    
    entries.push({ date: date.value, book: book.value, price });
    yearlyEntries[currentYear] = entries;
    updateLocalStorage();
    displayEntries();
    entryForm.reset();
});

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
    if (calculateBudget() - price < 0) {
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
    let budget = calculateBudget();
    const colors = { green: [0, 128, 0], orange: [255, 165, 0], red: [255, 0, 0] };
    let color;

    budget = Math.max(0, Math.min(budget, 850));

    color = budget >= 850 ? 'green' : budget <= 0 ? 'red' : (() => {
        const percentGreen = budget <= 425 ? (budget / 425) * 0.5 : ((budget - 425) / (850 - 425)) * 0.5 + 0.5;
        const [startColor, endColor] = percentGreen <= 0.5 ? ['red', 'orange'] : ['orange', 'green'];
        const mixedRGB = colors[startColor].map((val, i) => Math.round(val * (1 - percentGreen * 2) + colors[endColor][i] * percentGreen * 2));
        return `rgb(${mixedRGB.join(',')})`;
    })();

    budgetElement.style.color = color;
};