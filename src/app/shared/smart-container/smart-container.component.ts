import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Service, Schedule } from '../../core/types/types';
import { SchedulesService } from '../../core/services/schedules.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { dateFormatter } from './utils/schedule-utils';


@Component({
  selector: 'app-smart-container',
  standalone: true,
  providers: [ provideNativeDateAdapter(), SchedulesService ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
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
  inputedTime: number | null = null;
  inputedDate: string | null = null;
  @ViewChild('dateinput') dateinputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('inputedService') inputeddateRef!: ElementRef<HTMLInputElement>;
  @ViewChild('phoneinput') phoneinputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('nameinput') nameinputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('timeinput') timeinputRef!: ElementRef<HTMLInputElement>;

  selectedService: Service | null = null;

  constructor(private http: HttpClientModule, private schedulesService: SchedulesService) {
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
      'SEGUNDA',
      'TERÇA',
      'QUARTA',
      'QUINTA',
      'SEXTA',
      'SÁBADO',
      'DOMINGO',
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
    
    this.schedulesService.listSchedules(this.inputedDate!).subscribe((schedules) => {
      console.log(schedules);});

    this.inputedDate = dateFormatter(inputedValue);
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
    this.inputedTime = time;
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

    let dayOfWeek = this.daysOfWeek[new Date (this.inputedDate).getDay()];

    let formattedSchedule: Schedule = {
      date: `${dateFormatter(this.inputedDate)}T${this.inputedTime}:00`,
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

      this.schedulesService.createSchedule(this.formatSchedule(name, service, phone)).subscribe({
        next: (response: any) => {
          console.log(response);
          alert('Agendamento confirmado com sucesso!');
          this.mainView = 'firstView';
          this.selectedService = null;
          this.inputedDate = null;
          this.inputedTime = null;
        },
        error: (error: any) => {
          console.error(error);
          alert('Erro ao confirmar agendamento. Tente novamente.');
        }

      });
    } catch (error) {
      console.error(error);
      alert('Erro ao confirmar agendamento. Tente novamente.');
    }
  }
}