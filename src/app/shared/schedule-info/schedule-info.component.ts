import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../../core/services/shared.service';
import { isAfter, isBefore, isEqual } from 'date-fns';
import { ScheduleEditComponent } from '../schedule-edit/schedule-edit.component';
import { ScheduleDeleteComponent } from '../schedule-delete/schedule-delete.component';
import { Timestamp } from '@angular/fire/firestore';

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
    @Inject(MAT_DIALOG_DATA)
    public data: { timeSlot: number; weekDay: string; selectedDate: string },
    @Inject(SharedService) public sharedService: SharedService
  ) {
    this.findDataByDate(data.selectedDate, data.timeSlot);
  }

  deleteIsDisabled(index: string): boolean {
    if (index === 'index') {
      return true;
    }
    return false;
  }

  findDataByDate(date: string, time: number) {
    let day = parseInt(date.split('/')[0]);
    let month = parseInt(date.split('/')[1]) - 1;
    let year = parseInt(date.split('/')[2]);
    let dateObj = new Date(year, month, day, time, 0, 0);

    const slot = this.sharedService.slotsOccupied.find((slot) =>
      isEqual((slot.startTime as Timestamp).toDate(), new Date(dateObj))
    );
    const end = this.sharedService.slotsOccupied.find(
      (slot) =>
        isAfter(new Date(dateObj), new Date(slot.startTime as Date)) &&
        isBefore(new Date(dateObj), new Date(slot.endTime as Date))
    );

    this.id = slot?.id || 'index';
    this.name = slot?.clientName || 'Cliente Desconhecido';
    this.phone = slot?.clientPhone || '(00) 00000-0000';
    this.service = slot?.serviceName || 'Serviço Desconhecido';
    this.date =
      (slot?.startTime as Timestamp).toDate().toLocaleDateString('pt-BR') ||
      '01/01/2000';

    if (end) {
      this.id = end?.id || 'index';
      this.name = end?.clientName || 'Cliente Desconhecido';
      this.phone = end?.clientPhone || '(00) 00000-0000';
      this.service = end?.serviceName || 'Serviço Desconhecido';
      this.date =
        (slot?.startTime as Timestamp).toDate().toLocaleDateString('pt-BR') ||
        '01/01/2000';
    }
  }

  openEditDialog() {
    this.dialog.open(ScheduleEditComponent, {
      data: {
        id: this.id,
        name: this.name,
        phone: this.phone,
      },
    });
  }
  openDeleteDialog() {
    this.dialog.open(ScheduleDeleteComponent, {
      data: {
        id: this.id,
        name: this.name,
        phone: this.phone,
        service: this.service,
        date: this.date,
      },
    });
  }
}
