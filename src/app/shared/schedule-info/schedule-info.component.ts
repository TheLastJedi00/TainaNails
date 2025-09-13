import { Component, Inject, Input, OnInit } from '@angular/core';
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
export class ScheduleInfoComponent implements OnInit {
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
  ) {}
  ngOnInit(): void {
    this.findDataByDate(this.data.selectedDate, this.data.timeSlot);
  }

  deleteIsDisabled(index: string): boolean {
    if (index === 'index') {
      return true;
    }
    return false;
  }

  findDataByDate(date: string, time: number): void {
    const [day, month, year] = date.split('/').map(Number);
    const clickedDateTime = new Date(year, month - 1, day, time, 0, 0);

    const foundSchedule = this.sharedService.slotsOccupied.find((schedule) => {
      if (!schedule?.startTime || !schedule?.endTime) {
        return false;
      }

      const startTime = (schedule.startTime as Timestamp).toDate();
      const endTime = (schedule.endTime as Timestamp).toDate();

      return (
        isEqual(startTime, clickedDateTime) ||
        (clickedDateTime > startTime && clickedDateTime < endTime)
      );
    });

    if (foundSchedule) {
      this.id = foundSchedule.id || 'index';
      this.name = foundSchedule.clientName;
      this.phone = foundSchedule.clientPhone;
      this.service = foundSchedule.serviceName;
      this.date = (foundSchedule.startTime as Timestamp)
        .toDate()
        .toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    } else {
      this.name = 'Horário Disponível';
      this.id = 'index';
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
