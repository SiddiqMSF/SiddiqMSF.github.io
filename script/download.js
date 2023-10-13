import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

document.getElementById('downloadButton').addEventListener('click', () => {
    const wb = XLSX.utils.book_new();

    const data = Object.entries(yearlyEntries).flatMap(([year, entries]) =>
        entries.map(entry => [year, entry.date, entry.book, entry.price])
    );

    data.unshift(['Year', 'Date', 'Book', 'Price']);

    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'entries.xlsx');
});
