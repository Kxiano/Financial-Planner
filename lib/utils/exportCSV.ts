type Cell = string | number;

/** Quotes a cell when it holds a comma, a quote or a line break. */
const escapeCell = (cell: Cell) => {
  const text = String(cell);
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/** Builds a CSV and hands it to the browser as a download. */
export function downloadCSV(fileName: string, headers: string[], rows: Cell[][]) {
  const csv = [headers, ...rows].map((row) => row.map(escapeCell).join(',')).join('\r\n');
  // The BOM makes Excel read accented descriptions as UTF-8.
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
