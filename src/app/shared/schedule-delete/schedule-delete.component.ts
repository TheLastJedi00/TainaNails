import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { SchedulesService } from '../../core/services/schedules.service';
import { ScheduleInfoComponent } from '../schedule-info/schedule-info.component';

@Component({
  selector: 'app-schedule-delete',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule
],
  templateUrl: './schedule-delete.component.html',
  styleUrl: './schedule-delete.component.scss'
})
export class ScheduleDeleteComponent {
  idValue: number = this.data.id;
  nameValue: string = this.data.name;
  phoneValue: string = this.data.phone;
  serviceValue: string = this.data.service;
  dateValue: string = new Date(this.data.date)
  .toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });


  constructor(@Inject(MAT_DIALOG_DATA) public data: {
        id: number,
        name: string,
        phone: string,
        service: string,
        date: string,
      },
      @Inject(SchedulesService) private schedulesService: SchedulesService,
      public infoDialog: MatDialogRef<ScheduleInfoComponent>
    ) {}

  deleteSchedule() {
    this.schedulesService.deleteSchedule(this.idValue).subscribe({
      next: (res) => {
        console.log('Agendamento excluído com sucesso:', res);
        window.location.reload();
      },
      error: (err) => {
        console.error('Erro ao excluir agendamento:', err);
      }
    });
  }
}
