import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

interface Service {
    id: number;
    name: string;
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
  mainView: string = 'firstView';
  timeList: number[] = [];
  @ViewChild('dateinput') dateinputRef!: ElementRef<HTMLInputElement>;
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
  
  selectService(service: Service):void {
    this.selectedService = service;
    this.showDateSelection();
    console.log(this.selectedService);
  }

  showTimeSelection() {
    let inputValue = this.dateinputRef.nativeElement.value;

    if (inputValue === '') {
      alert('Selecione uma data');
      return;
    }
    
    let date = new Date(inputValue);

    if (date.getDay() === 6) {
      alert('No momento não estou atendo aos domingos');
      return;
    } else {
      this.mainView = 'timeSelection';
    }
  }
}
