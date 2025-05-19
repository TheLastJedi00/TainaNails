import { tableDate } from "./Globals.js";
import { timeTable } from "./TimeTable.js";
import { timeTableSize } from "./TimeTableSize.js";

export let weekdayName = "";
export let day = "";
export let month = "";

export function ProcessedDate(inputValue, tableList, tableDiv) {
  //date class receive date inputed
  const date = new Date(inputValue);
  //Split elements in date
  const [year, globalMonth, globalDay] = inputValue.split("-");
  month = globalMonth;
  day = globalDay;
  //Save weekday
  const weekday = date.getDay();
  //Array with days of week in portuguese
  const daysOfWeek = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];
  //Translate weekday
  weekdayName = daysOfWeek[weekday];
  //if inputed value is null, alert; else, log of this value and update table
  if (inputValue === "") {
    alert("Escolha uma data antes de confirmar!");
  } else {
    //update table with formated date
    timeTable(weekday, tableList);
    timeTableSize(weekday, tableList, tableDiv);
    tableDate.innerText = `${weekdayName} ${day}/${month}`;
  }
  //If sunday is choosed, reload page with alert
  if (weekday === 6) {
    alert("No momento não estou atendendo aos domingos.");
    location.reload();
  }
}
