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
  idValue: string = this.data.id;
  nameValue: string = this.data.name;
  phoneValue: string = this.data.phone;
  serviceValue: string = this.data.service;
  dateValue: string = this.data.date;


  constructor(@Inject(MAT_DIALOG_DATA) public data: {
        id: string,
        name: string,
        phone: string,
        service: string,
        date: string,
      },
      @Inject(SchedulesService) private schedulesService: SchedulesService,
      public infoDialog: MatDialogRef<ScheduleInfoComponent>
    ) {}

  deleteSchedule() {
    this.schedulesService.deleteSchedule(this.idValue).then(() => {
      this.infoDialog.close();
      console.log('Schedule deleted successfully');
      window.location.reload();
    }).catch((error) => {
      console.error('Error deleting schedule:', error);
    });
  }
}
