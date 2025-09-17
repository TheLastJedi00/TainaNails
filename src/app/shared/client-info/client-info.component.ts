import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-client-info',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.scss'
})
export class ClientInfoComponent {
  @Input() acessCode!: string;
  @Input() clientName!: string;
  @Input() clientPhone!: string;
  @Input() serviceName!: string;
  @Input() startTime!: Timestamp | Date;
  
  startTimeToDate(): string {
    const date = (this.startTime as Timestamp).toDate().toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return date.replace(',', '');
  }
}
