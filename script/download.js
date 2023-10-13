document.getElementById('downloadButton').addEventListener('click', () => {
    const entries = Object.entries(yearlyEntries).flatMap(([year, entries]) =>
        entries.map(entry => ({Year: year, Date: entry.date, Book: entry.book, Price: entry.price}))
    );

    /* create a new blank workbook and worksheet */
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(entries);

    /* add the worksheet to the workbook */
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* write the workbook and force a download */
    XLSX.writeFile(wb, 'entries.xlsx');
});
