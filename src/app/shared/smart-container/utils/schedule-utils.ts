import { before } from 'node:test';
import { Schedule } from '../../../core/types/types';

export function dateFormatter(date: string): string {
  let splitter = date.split('-');
  let year = parseInt(splitter[0]);
  let month = parseInt(splitter[1]).toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
  let day = parseInt(splitter[2]);

  let formattedDate: string = `${year}-${month}-${day}`;
  return formattedDate;
}

export function isValidInputedDate(selectedDate: string): boolean {
  let date = new Date(selectedDate);
  let dayOfWeek = date.getDay();
  let currentDate = new Date();

  let domingo: boolean = dayOfWeek === 0; // é domingo
  let isBeforeToday: boolean = date < currentDate; // é antes de hoje
  let isNow: boolean = date.toDateString() === currentDate.toDateString(); // é hoje

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
