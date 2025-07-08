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

export function listSavedSchedules(
  scheduleList: Page<ScheduleResponse>,
  selectedDate: string
): number[] {
  let listEmpty: boolean =
    scheduleList.empty || scheduleList.content.length === 0;
  let slots: number[] = [];

  if (listEmpty) {
    console.log('Nenhum agendamento neste dia.');
  }

  scheduleList.content.forEach((schedule) => {
    let startSchedule: number = parseInt(
      schedule.date.split('T')[1].split(':')[0]
    );
    let endSchedule = parseInt(
      schedule.endOfService.split('T')[1].split(':')[0]
    );

    slots.push(startSchedule, endSchedule);
  });

  return slots;
}

export function timeList(date: string): number[] {
  let dayOfWeek = new Date(date).getDay();

  let quarta: boolean = dayOfWeek === 2;
  let sabado: boolean = dayOfWeek === 5;

  switch (true) {
    case quarta:
      return [15, 16, 17, 18];
    case sabado:
      return [8, 9, 10, 11, 13, 14, 15, 16, 17];
    default:
      return [14, 15, 16, 17, 18];
  }
}
