document.getElementById('downloadButton').addEventListener('click', () => {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(
        Object.entries(yearlyEntries).flatMap(([year, entries]) =>
            entries.map(entry => ({Year: year, Date: entry.date, Book: entry.book, Price: entry.price}))
        )
    ), "Sheet1");
    XLSX.writeFile(wb, 'entries.xlsx');
});
