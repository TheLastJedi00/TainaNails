import { before } from 'node:test';
import { Page, Schedule, ScheduleResponse } from '../../../core/types/types';

export function dateFormatter(date: string): string {
  let splitter = date.split('-');
  let year = parseInt(splitter[0]);
  let month = parseInt(splitter[1]).toString().padStart(2, '0');
  let day = parseInt(splitter[2]).toString().padStart(2, '0');

  let formattedDate: string = `${year}-${month}-${day}`;
  return formattedDate;
}

export function isValidInputedDate(selectedDate: string): boolean {
  let date = new Date(selectedDate);
  let dayOfWeek = date.getDay();
  let currentDate = new Date();

  let domingo: boolean = dayOfWeek === 0;
  let isBeforeToday: boolean = date < currentDate;
  let isNow: boolean = date.toDateString() === currentDate.toDateString();

  switch (true) {
    case isBeforeToday:
      console.log('Data inválida: A data selecionada é anterior a hoje.');
      return false;
    case domingo:
      alert('No momento não estou atendendo aos domingos');
      return false;
    case isNow:
      console.log('Data inválida: A data selecionada é hoje.');
      return false;
  }

  return true;
}

export function checkSavedSchedules(
  scheduleList: Page<ScheduleResponse>,
  selectedDate: string
): any {
  let listEmpty: boolean =
    scheduleList.empty || scheduleList.content.length === 0;
  if (listEmpty) {
    console.log('Nenhum agendamento neste dia.');
  }

  let start = scheduleList.content.forEach((schedule) => {
    let startSchedule = schedule.date.split('T')[1].split(':')[0];
    let endSchedule = schedule.endOfService.split('T')[1].split(':')[0];
    



    return [startSchedule, endSchedule];
  });
}
