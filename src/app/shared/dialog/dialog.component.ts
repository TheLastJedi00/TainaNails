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
  MatDialog,
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
import { IMaskModule } from 'angular-imask';
import { MatIconModule } from '@angular/material/icon';
import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';

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
    IMaskModule,
    MatIconModule,
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

  phoneMask = {
    mask: [
      {
        mask: '(00) 0000-0000',
      },
      {
        mask: '(00) 00000-0000',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private schedulesService: SchedulesService,
    private sharedServices: SharedService,
    private responseDialog: MatDialog,
    public utils: DialogUtils
  ) {}

  formGroup: FormGroup = this.fb.group({
    nameCtrl: ['', Validators.required],
    phoneCtrl: ['', [Validators.required, this.utils.phoneValidator()]],
    serviceCtrl: ['', Validators.required],
    dateCtrl: ['', [Validators.required, this.utils.dateValidator()]],
    timeCtrl: ['', Validators.required],
  });

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

    dialogRef.afterClosed().subscribe((result) => {});
  }

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

        const selectedService = this.utils.services.find(
          (s) => s.name === service
        );

        const LONG_SERVICE_THRESHOLD = 60;

        if (
          selectedService &&
          selectedService.duration > LONG_SERVICE_THRESHOLD
        ) {
          this.timeList = avaliableTimeList.filter((slot) => {
            const isLastSlotException = slot === 18;

            const nextSlotIsAvailable = avaliableTimeList.includes(slot + 1);

            return isLastSlotException || nextSlotIsAvailable;
          });
        } else {
          this.timeList = avaliableTimeList;
        }
      },
    });
  }

  timeListIsEmpty(disable?: boolean): boolean {
    if (disable) {
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

  acessCode(name: string, phone: string): string {
    const splitPhone = phone.split('-')[1];
    return `${name[0].toLocaleUpperCase()}${splitPhone}`;
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
      acessCode: this.acessCode(formValues.nameCtrl, formValues.phoneCtrl),
    };

    const dialogRef = this.responseDialog.open(ResponseDialogComponent, {
      data: { isLoading: true },
    });

    this.avaliableTimeList();

    this.schedulesService
      .createSchedule(schedule)
      .then(() => {
        dialogRef.close();
        this.openResponseDialog(
          false,
          'check_circle',
          'Agendamento efetuado com sucesso!',
          'rgb(127, 206, 145)',
          'O código para acompanhar seu agendamento é a primeira letra do seu nome junto aos quatro útimos dígitos do seu telefone.',
          this.acessCode(formValues.nameCtrl, formValues.phoneCtrl)
        );
      })
      .catch((error) => {
        dialogRef.close();
        this.openResponseDialog(
          false,
          'error',
          'Infelizmente houve um erro',
          'rgba(206, 127, 127, 1)',
          error
        );
      });
  }
}
