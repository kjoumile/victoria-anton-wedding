function getSheet_() {
  var sheetName = "Ответы";
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Дата записи",
      "Время ответа ISO",
      "Имя",
      "Присутствие",
      "Алкоголь",
      "Ребенок",
      "Комментарий"
    ]);
  }

  return sheet;
}

function doPost(e) {
  var sheet = getSheet_();
  var alcoholValues = e.parameters.alcohol || [];

  sheet.appendRow([
    new Date(),
    e.parameter.savedAt || "",
    e.parameter.name || "",
    e.parameter.presence || "",
    alcoholValues.join(", "),
    e.parameter.child || "",
    e.parameter.message || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
