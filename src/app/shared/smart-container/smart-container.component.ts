import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-smart-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-container.component.html',
  styleUrl: './smart-container.component.scss',
})
export class SmartContainerComponent {
  services: { id: number; name: string }[] = [];
  mainView: string = 'firstView';
  timeList: number[] = [];
  
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
  showTimeSelection() {
    this.mainView = 'timeSelection';
  }
}
