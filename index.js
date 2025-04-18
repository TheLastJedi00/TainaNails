const chooseDate = document.querySelector("#data");
const confirmButton = document.querySelector("#botao-confirmar");
const tableDate = document.querySelector("#titulo-tabela");
//Listen click confirm button event and save in "event" parameter
confirmButton.addEventListener("click", (event) => {
  //Prevent page reload
  event.preventDefault();
  //Value of date choosed
  const inputValue = chooseDate.value;
  //log of choosed date
  console.log(`Input date: ${inputValue}`);
  //date class receive date inputed
  const date = new Date(inputValue);
  //Split elements in date
  const [year, month, day] = inputValue.split("-");
  //Save weekday
  const weekday = date.getDay();
  //log
  console.log(`Day of week in array: ${weekday}`);
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
  const weekdayName = daysOfWeek[weekday];
  //Log
  console.log(`Day of week in portuguese: ${weekdayName}`);
  //if inputed value is null, alert; else, log of this value and update table
  if (inputValue === "") {
    alert("Escolha uma data antes de confirmar!");
  } else {
    //update table with formated date
    tableDate.innerText = `${weekdayName}  ${day}/${month}`;
  }
  //If sunday is choosed, reload page with alert
  if (weekday === 6) {
    alert("No momento não estou atendendo aos domingos.");
    location.reload();
  }
});
