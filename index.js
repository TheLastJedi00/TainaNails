const chooseDate = document.querySelector("#data");
const confirmButton = document.querySelector("#botao-confirmar");
const tableDate = document.querySelector("#titulo-tabela");
const list = document.querySelector("#tabela");
//Select Here Button
const selectService = document.querySelector("#servico");
//Grid of services
const serviceList = document.querySelector("#lista-servicos");
//Listen click confirm button event and save in "event" parameter
confirmButton.addEventListener("click", (event) => {
  //Prevent page reload
  event.preventDefault();
  //Value of date choosed
  const inputValue = chooseDate.value;
  //date class receive date inputed
  const date = new Date(inputValue);
  //Split elements in date
  const [year, month, day] = inputValue.split("-");
  //Save weekday
  const weekday = date.getDay();
  console.log(weekday);
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
  //if inputed value is null, alert; else, log of this value and update table
  if (inputValue === "") {
    alert("Escolha uma data antes de confirmar!");
  } else {
    //update table with formated date
    schedulingData(day, month, weekdayName);
    timeTable(weekday);
    timeTableSize(weekday);
    tableDate.innerText = `${weekdayName} ${day}/${month}`;
  }
  //If sunday is choosed, reload page with alert
  if (weekday === 6) {
    alert("No momento não estou atendendo aos domingos.");
    location.reload();
  }
});

//this function create a list of avaliable times depending on the day chosen (weekday)
function timeTable(weekday) {
  const normalTime = [14, 15, 16, 17, 18];
  const wednesdayTime = [15, 16, 17, 18];
  const saturdayTime = [8, 14, 9, 15, 10, 16, 11, 17, 13, 18];
  //this function catch chosen day of week and
  function createList(time) {
    list.innerHTML = "";

    time.forEach((itemTime) => {
      const itemList = document.createElement("li");
      itemList.className = "horarios__texto";
      itemList.textContent = `${itemTime}h`;
      list.appendChild(itemList);
    });
  }
  if (weekday === 5) {
    createList(saturdayTime);
  } else if (weekday === 2) {
    createList(wednesdayTime);
  } else {
    createList(normalTime);
  }
}

function timeTableSize(weekday) {
  const tableList = document.querySelector("#tabela");
  const tableDiv = document.querySelector("#div-tabela");

  if (weekday !== 5) {
    tableDiv.style.width = "120px";
    tableList.style.gridTemplateColumns = "100%";
  } else {
    tableList.style.gridTemplateColumns = "50% 50%";
    tableDiv.style.width = "200px";
  }
}

function schedulingData(
  day,
  month,
  weekdayName,
) {
  console.log(`Dia: ${weekdayName} ${day}, Mês: ${month}`);
}

selectService.addEventListener("click", (event) => {
  event.preventDefault();
  serviceList.classList.toggle("show");
});
serviceList.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.tagName === "BUTTON") {
    serviceList.classList.remove("show");
    let selectedButton = event.target.innerText;
    console.log(selectedButton);
    selectService.innerText = selectedButton;
    selectService.style.height = "100px";
  }
});
