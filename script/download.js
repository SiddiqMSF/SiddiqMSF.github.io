document.getElementById('downloadButton').addEventListener('click', () => {
    const csvContent = Object.entries(yearlyEntries).flatMap(([year, entries]) =>
        entries.map(entry => `${year},${entry.date},${entry.book},${entry.price}`)
    ).join('\n');

    const blob = new Blob([`Year,Date,Book,Price\n${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = Object.assign(document.createElement('a'), {
        href: url,
        download: 'entries.csv',
        style: { visibility: 'hidden' },
    });

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});