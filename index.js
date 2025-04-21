import {
  chooseDate,
  confirmButton,
  tableList,
  tableDiv,
  selectService,
  serviceList,
  scheduleButton,
} from "../scripts/Globals.js";
import {
  ProcessedDate,
  weekdayName,
  day,
  month,
} from "../scripts/ProcessedDate.js";
import { schedulingData } from "../scripts/SchedulingData.js";

//Listen click confirm button event and save in "event" parameter
confirmButton.addEventListener("click", (event) => {
  //Prevent page reload
  event.preventDefault();
  //Value of date choosed
  const inputValue = chooseDate.value;
  //Function to process date and update table
  ProcessedDate(inputValue, tableList, tableDiv);
});
//Event listener on click "Select Here" button
selectService.addEventListener("click", (event) => {
  event.preventDefault();
  //add "show" class in the button
  serviceList.classList.toggle("show");
});
//Event listener in List of services
serviceList.addEventListener("click", (event) => {
  event.preventDefault();
  //If click in any button of list of services
  if (event.target.tagName === "BUTTON") {
    //remove "show" class
    serviceList.classList.remove("show");
    //Catch the inner text of the selected button and save in a variable
    let selectedButton = event.target.innerText.trim();
    //Button "Select Here" show the selected service
    selectService.innerText = selectedButton;
    //Set height of button to 100px
    selectService.style.height = "100px";
  }
});
//Event listener on a schedule button click
scheduleButton.addEventListener("click", (event) => {
  event.preventDefault();
  const hourInput = document.querySelector("#horario").value;
  const nameInput = document.querySelector("#nome").value;
  const serviceInput = document.querySelector("#servico").innerText;
  const phoneInput = document.querySelector("#numero").value;
  const dayInput = day;
  const monthInput = month;
  const thisWeekdayName = weekdayName;
  schedulingData(
    thisWeekdayName,
    dayInput,
    monthInput,
    hourInput,
    nameInput,
    serviceInput,
    phoneInput
  );
});
