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
export class DialogComponent implements OnInit {
  timeList!: number[];
  isLinear: boolean = false;
  name: string = '';
  phone: string = '';
  service: string = '';
  date: string = '';
  time: number = 0;
  subscriptions: Subscription[] = [];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private schedulesService: SchedulesService,
    public utils: DialogUtils
  ) {

    this.timeList = [8, 9, 10, 11, 14, 15, 16, 17, 18];
  }

  formGroup: FormGroup = this.fb.group({
    nameCtrl: ['', Validators.required],
    phoneCtrl: ['', Validators.required],
    serviceCtrl: ['', Validators.required],
    dateCtrl: ['', [Validators.required, this.utils.dateValidator()]],
    timeCtrl: ['', Validators.required],
  });


  ngOnInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe((value) => {
        this.name = value.nameCtrl;
        this.phone = value.phoneCtrl;
        this.service = value.serviceCtrl;
        if (value.dateCtrl) {
          const date = value.dateCtrl as Date;
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          this.date = `${year}-${month}-${day}`;
        }
        this.time = value.timeCtrl;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  timeListIsEmpty(): boolean {
    return this.timeList.length === 0;
  }

  createSchedule(): void {
    const schedule: Schedule = {
      date: `${this.date}T${this.time.toString().padStart(2, '0')}:00`,
      name: this.name,
      service: this.service,
      serviceCode: this.utils.services.find((s) => s.name === this.service)?.id || 0,
      phone: this.phone,
      dayOfWeek: this.utils.getDayOfWeek(new Date(this.date)),
    };
    this.schedulesService.createSchedule(schedule).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error creating schedule:', error);
      },
    });
  }
}
