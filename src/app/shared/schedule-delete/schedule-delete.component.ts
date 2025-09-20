import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { SchedulesService } from '../../core/services/schedules.service';
import { ScheduleInfoComponent } from '../schedule-info/schedule-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';

@Component({
  selector: 'app-schedule-delete',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './schedule-delete.component.html',
  styleUrl: './schedule-delete.component.scss',
})
export class ScheduleDeleteComponent {
  idValue: string = this.data.id;
  nameValue: string = this.data.name;
  phoneValue: string = this.data.phone;
  serviceValue: string = this.data.service;
  dateValue: string = this.data.date;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string;
      name: string;
      phone: string;
      service: string;
      date: string;
    },
    @Inject(SchedulesService) private schedulesService: SchedulesService,
    public infoDialog: MatDialogRef<ScheduleInfoComponent>,
    public responseDialog: MatDialog
  ) {}

  openResponseDialog(
    isLoading: boolean,
    matIcon?: string,
    title?: string,
    iconColor?: string,
    description?: string,
    strong?: string
  ) {
    const dialogRef = this.responseDialog.open(ResponseDialogComponent, {
      data: {
        isLoading: isLoading,
        matIcon: matIcon,
        title: title,
        iconColor: iconColor,
        description: description,
        strong: strong,
      },
    });
  }
  deleteSchedule() {
    // this.isLoading = true;
    this.schedulesService

    const response = this.responseDialog.open(ResponseDialogComponent, {
      data: { isLoading: true },
    });

    this.schedulesService
      .deleteSchedule(this.idValue)
      .then(() => {
        response.close();
        this.infoDialog.close();
        this.openResponseDialog(false, 'check_circle', 'Agendamento cancelado com sucesso!', 'rgb(127, 206, 145)', 'Recarregue a página pra atualizar as alterações.');
      })
      .catch((error) => {
        response.close();
        this.openResponseDialog(false, 'error', 'Infelizmente houve um erro', 'rgb(206, 127, 127)');
        console.error('Error deleting schedule:', error);
      });
  }
}
