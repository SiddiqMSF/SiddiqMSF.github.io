document.getElementById('downloadButton').addEventListener('click', () => {
    const now = new Date();
    const formattedDate = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
    const formattedTime = `${now.getHours()}-${now.getMinutes()}`;
    const filename = `BudgetKitab_${formattedDate}_${formattedTime}.xlsx`;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(
        Object.entries(yearlyEntries).flatMap(([year, entries]) =>
            entries.map(entry => ({Year: year, Date: entry.date, Book: entry.book, Price: entry.price}))
        )
    ), "Sheet1");
    XLSX.writeFile(wb, filename);
});