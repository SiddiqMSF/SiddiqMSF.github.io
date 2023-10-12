function downloadEntries() {
    // Prepare CSV content
    let csvContent = 'Year,Date,Book,Price\n';

    for (let year in yearlyEntries) {
        yearlyEntries[year].forEach(entry => {
            csvContent += `${year},${entry.date},${entry.book},${entry.price}\n`;
        });
    }

    // Create a Blob with the CSV content
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a link element
    let link = document.createElement("a");

    if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        let url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "entries.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}  