import { NullFieldDetector } from "./NullFieldDetector.js";

export function schedulingData(
  weekdayName,
  day,
  month,
  hour,
  name,
  service,
  phone
) {
  function isServiceValid(service) {
    if (service === "Selecione aqui") {
      alert("Selecione um serviço.");
      return false;
    }
    return true;
  }

  const IsNameValid = !NullFieldDetector("Nome", name);
  const IsPhoneValid = !NullFieldDetector("Contato", phone);
  const IsHourValid = !NullFieldDetector("Horário", hour);
  const IsWeekdayValid = !NullFieldDetector("Dia da Semana", weekdayName);
  const IsDayValid = !NullFieldDetector("Dia", day);
  const IsMonthValid = !NullFieldDetector("Mês", month);
  if (
    IsDayValid &&
    IsMonthValid &&
    IsWeekdayValid &&
    IsHourValid &&
    IsNameValid &&
    IsPhoneValid &&
    isServiceValid(service)
  ) {
    console.log(`Dia: ${weekdayName} ${day}/${month}`);
    console.log(`Cliente: ${name}    Contato: ${phone}`);
    console.log(`Tipo do atendimento: ${service}`);
    console.log(`Horário: ${hour}`);
  }
}
