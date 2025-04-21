//this function create a list of avaliable times depending on the day chosen (weekday)
export function timeTable(weekday, tableList) {
  const normalTime = [14, 15, 16, 17, 18];
  const wednesdayTime = [15, 16, 17, 18];
  const saturdayTime = [8, 14, 9, 15, 10, 16, 11, 17, 13, 18];
  //this function catch chosen day of week and
  function createList(time) {
    tableList.innerHTML = "";

    time.forEach((itemTime) => {
      const itemList = document.createElement("li");
      itemList.className = "horarios__texto";
      itemList.textContent = `${itemTime}h`;
      tableList.appendChild(itemList);
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
