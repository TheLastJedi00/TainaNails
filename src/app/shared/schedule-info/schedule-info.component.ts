import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-schedule-info',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './schedule-info.component.html',
  styleUrl: './schedule-info.component.scss',
})
export class ScheduleInfoComponent {
  @Input('id') id: string = 'index';
  @Input('name') name: string = 'Cliente Desconhecido';
  @Input('phone') phone: string = '(00) 00000-0000';
  @Input('service') service: string = 'Serviço Desconhecido';
  @Input('date') date: string = '01/01/2000';

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { timeSlot: number; weekDay: string }
  ) {}
}
