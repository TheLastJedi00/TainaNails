import { CommonModule, Time, WeekDay } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Service, Schedule } from '../../core/types/types';
import { SchedulesService } from '../../core/services/schedules.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-smart-container',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './smart-container.component.html',
  styleUrl: './smart-container.component.scss',
})
export class SmartContainerComponent {
  services: Service[] = [];
  daysOfWeek: string[] = [];
  mainView: string = 'firstView';
  scheduleObject!: Schedule;
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
      { id: 4, name: 'Manicure e Pedicure Decorados' },
      { id: 5, name: 'Manicure Decorado' },
      { id: 6, name: 'Pedicure Decorado' },
      { id: 7, name: 'Manicure em Gel e Pedicure Simples' },
      { id: 8, name: 'Manicure e Pedicure com Esmaltação em Gel' },
      { id: 9, name: 'Manicure com Esmaltação em Gel' },
      { id: 10, name: 'Pedicure com Esmaltação em Gel' },
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

  dateFormatter(date: string): Date {
    let splitter = date.split('-');
    let year = parseInt(splitter[0]);
    let month = parseInt(splitter[1]) - 1; // Month is 0-indexed in JavaScript
    let day = parseInt(splitter[2]);

    let formattedDate: Date = new Date(year, month, day);
    return formattedDate;
  }

  showTimeSelection() {
    let inputedValue = this.dateinputRef.nativeElement.value;

    this.inputedDate = this.dateFormatter(inputedValue);
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

  selectedTime(time: number) {
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

  formatSchedule(name: string, service: string, phone: string): Schedule {
    if (!this.inputedDate || !this.inputedTime) {
      throw new Error('Data ou hora não selecionada');
    }

    let dayOfWeek = this.daysOfWeek[this.inputedDate.getDay()];

    let formattedSchedule: Schedule = {
      date: new Date(
        this.inputedDate.getFullYear(),
        this.inputedDate.getMonth(),
        this.inputedDate.getDate(),
        this.inputedTime.getHours(),
        0,
        0,
        0
      ),
      name: name,
      service: service,
      serviceCode: this.selectedService ? this.selectedService.id : 0,
      phone: phone,
      dayOfWeek: dayOfWeek,
    };

    return formattedSchedule;
  }

  confirmSchedule() {
    let name = this.nameinputRef.nativeElement.value;
    let service = this.selectedService ? this.selectedService.name : '';
    let phone = this.phoneinputRef.nativeElement.value;

    if (!name || !service || !phone) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      console.log(this.formatSchedule(name, service, phone));
      alert('Fecthing Schedule');
    } catch (error) {
      console.error(error);
      alert('Erro ao confirmar agendamento. Tente novamente.');
    }
  }
}
