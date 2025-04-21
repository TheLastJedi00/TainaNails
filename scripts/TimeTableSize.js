export function timeTableSize(weekday, tableList, tableDiv) {
  if (weekday !== 5) {
    tableDiv.style.width = "120px";
    tableList.style.gridTemplateColumns = "100%";
  } else {
    tableList.style.gridTemplateColumns = "50% 50%";
    tableDiv.style.width = "200px";
  }
}
