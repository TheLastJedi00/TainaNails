import { CommonModule, Time, WeekDay } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { time } from 'node:console';

interface Service {
  id: number;
  name: string;
}
interface Schedule {
  date: Date;
  name: string;
  service: string;
  serviceCode: number;
  phone: string;
  dayOfWeek: string;
}

@Component({
  selector: 'app-smart-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-container.component.html',
  styleUrl: './smart-container.component.scss',
})
export class SmartContainerComponent {
  services: Service[] = [];
  daysOfWeek: string[] = [];
  mainView: string = 'firstView';
  timeList: number[] = [];
  inputedTime: Date | null = null;
  inputedDate: Date | null = null;
  @ViewChild('dateinput') dateinputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('inputedService') inputeddateRef!: ElementRef<HTMLInputElement>;
  @ViewChild('phoneinput') phoneinputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('nameinput') nameinputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('timeinput') timeinputRef!: ElementRef<HTMLInputElement>;

  selectedService: Service | null = null;

  constructor() {
    this.services = [
      { id: 1, name: 'Manicure' },
      { id: 2, name: 'Pedicure' },
      { id: 3, name: 'Manicure e Pedicure' },
      { id: 4, name: 'Manicure Decorado' },
      { id: 5, name: 'Pedicure Decorado' },
      { id: 6, name: 'Manicure e Pedicure Decorado' },
      { id: 7, name: 'Manicure com Esmaltação em Gel' },
      { id: 8, name: 'Pedicure com Esmaltação em Gel' },
      { id: 9, name: 'Manicure e Pedicure com Esmaltação em Gel' },
      { id: 10, name: 'Manicure em Gel e Pedicure Simples' },
      { id: 11, name: 'Unhas Postiças' },
      { id: 12, name: 'Unhas Postiças Decoradas' },
      { id: 13, name: 'Unhas Postiças Realistas' },
      { id: 14, name: 'Unhas Postiças Realistas Decoradas' },
      { id: 15, name: 'Blindagem' },
      { id: 16, name: 'Banho de Gel' },
      { id: 17, name: 'Alongamento com fibra de vidro' },
      { id: 18, name: 'Alongamento Model F1' },
      { id: 19, name: 'Alongamento com Tip de Gel' },
      { id: 20, name: 'Alongamento com SoftGel' },
      { id: 21, name: 'Remoção de Alongamento' },
    ];

    this.daysOfWeek = [
      'DOMINGO',
      'SEGUNDA',
      'TERÇA',
      'QUARTA',
      'QUINTA',
      'SEXTA',
      'SÁBADO',
    ];

    this.timeList = [14, 15, 16, 17, 18];
  }

  showServices() {
    this.mainView = 'serviceList';
  }
  returnFirstView() {
    this.mainView = 'firstView';
  }
  showDateSelection() {
    this.mainView = 'dateSelection';
  }

  selectService(service: Service): void {
    this.selectedService = service;
    this.showDateSelection();
    console.log(this.selectedService);
  }

  showTimeSelection() {
    let inputedValue = this.dateinputRef.nativeElement.value;
    let day = new Date(inputedValue).getDate();
    let month = new Date(inputedValue).getMonth();
    let year = new Date(inputedValue).getFullYear();
    this.inputedDate = new Date(year, month, day + 1);
    console.log(this.inputedDate);


    if (inputedValue === '') {
      alert('Selecione uma data');
      return;
    }

    let date = new Date(inputedValue);

    if (date.getDay() === 6) {
      alert('No momento não estou atendo aos domingos');
      return;
    } else {
      this.mainView = 'timeSelection';
    }
  }

  selectedTime(time: number){
    this.mainView = 'confirmSchedule';
    this.showConfirmSchedule();
    const newTime = new Date().setHours(time, 0, 0, 0);
    this.inputedTime = new Date(newTime);
  }

  showConfirmSchedule() {
    this.mainView = 'confirmSchedule';
  }

  returnTimeSelection() {
    this.mainView = 'timeSelection';
  }

  saveSchedule() {
    let date = this.inputedDate?.getDate();
    let dayOfWeek = this.daysOfWeek[this.inputedDate?.getDay()!];
    let time = this.inputeddateRef.nativeElement.value;
    let service = this.selectedService?.name;
    let serviceCode = this.selectedService?.id;
    let phone = this.dateinputRef.nativeElement.value;
    let name = this.dateinputRef.nativeElement.value;
  }
}
