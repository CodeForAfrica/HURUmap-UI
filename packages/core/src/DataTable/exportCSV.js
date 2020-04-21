function convertToCSV(rows) {
  return rows.map((row) => row.filter((val) => val).join(",")).join("\r\n");
}

export default function exportCSV(headers, items, fileTitle) {
  const csv = convertToCSV([
    Object.values(headers),
    ...items.map((item) => Object.keys(headers).map((key) => item[key])),
  ]);

  const exportedFilenmae = `${fileTitle}.csv` || "export.csv";

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  if (link.download !== undefined) {
    // feature detection
    // Browsers that support HTML5 download attribute
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", exportedFilenmae);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
