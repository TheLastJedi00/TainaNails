import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SchedulesService } from '../../core/services/schedules.service';
import { Schedule } from '../../core/types/types';
import { DialogUtils } from './dialog-utils/dialog-utils';
import { SharedService } from '../../core/services/shared.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [
    DialogUtils,
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  timeList: number[] = [];
  isLinear: boolean = false;
  normalDaySlots: number[] = [14, 15, 16, 17, 18];
  wednesdaySlots: number[] = [15, 16, 17, 18];
  saturdaySlots: number[] = [8, 9, 10, 11, 14, 15, 16, 17, 18];
  subscriptions: Subscription[] = [];
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private schedulesService: SchedulesService,
    private sharedServices: SharedService,
    public utils: DialogUtils
  ) {
    
  }

  formGroup: FormGroup = this.fb.group({
    nameCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
    serviceCtrl: ['', Validators.required],
    dateCtrl: ['', [Validators.required, this.utils.dateValidator()]],
    timeCtrl: ['', Validators.required],
  });

  avaliableTimeList() {
    const selectedDate = new Date(this.formGroup.value.dateCtrl);
    const startOfDay: Date = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
    const dayOfWeek = selectedDate.getDay();
    const service = this.formGroup.value.serviceCtrl;
    const occupiedTimeList: number[] = [];
    let avaliableTimeList: number[] = [];

    this.schedulesService.listSchedules(startOfDay, endOfDay).subscribe({
      next: (schedulesFromDb) => {
        schedulesFromDb.forEach((s) => {
          const startTime = (s.startTime as Timestamp).toDate().getHours();
          const endTime = (s.endTime as Timestamp).toDate().getHours();
          occupiedTimeList.push(startTime);
          if (startTime !== endTime) {
            occupiedTimeList.push(endTime);
          }
        });
        let baseTimeSlots: number[] = [];
            switch (dayOfWeek) {
                case 3:
                    baseTimeSlots = this.wednesdaySlots;
                    break;
                case 6:
                    baseTimeSlots = this.saturdaySlots;
                    break;
                default:
                    baseTimeSlots = this.normalDaySlots;
                    break;
            }

            avaliableTimeList = baseTimeSlots.filter(
                (slot) => !occupiedTimeList.includes(slot)
            );
            this.isLoading = false;
            this.timeList = avaliableTimeList;
      },
    });
  }

  timeListIsEmpty(disable?: boolean): boolean {
    if(disable){
      return false;
    }
    return this.timeList.length === 0;
  }

  endOfService(dateTime: Date): Date {
    const selectedService = this.utils.services.find(
      (service) => service.name === this.formGroup.value.serviceCtrl
    );

    const endTime = new Date(dateTime);
    endTime.setMinutes(dateTime.getMinutes() + selectedService!.duration);

    return endTime;
  }

  createSchedule(): void {
    const formValues = this.formGroup.value;
    const dateTime = new Date(formValues.dateCtrl);
    dateTime.setHours(formValues.timeCtrl);

    const schedule: Schedule = {
      startTime: dateTime,
      endTime: this.endOfService(dateTime),
      clientName: formValues.nameCtrl,
      clientPhone: formValues.phoneCtrl,
      serviceName: formValues.serviceCtrl,
      active: true,
      createdAt: new Date(),
    };

    this.avaliableTimeList();
    this.schedulesService.createSchedule(schedule).then(() => {
      this.dialogRef.close();
    });
  }
}
