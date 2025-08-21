import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SchedulesService } from '../../core/services/schedules.service';
import { WeekUtils } from './utils/week-utils';

@Component({
  selector: 'app-schedule-week',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    SchedulesService,
    WeekUtils,
  ],
  templateUrl: './schedule-week.component.html',
  styleUrl: './schedule-week.component.scss',
})
export class ScheduleWeekComponent {
  dateControl = new FormControl('', [Validators.required, this.dateValidator]);

  dateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const date = new Date(control.value);

    if (date.getDay() !== 1) {
      return { invalidDate: true };
    }
    return null;
  }

  constructor(
    @Inject(SchedulesService) public service: SchedulesService,
    @Inject(WeekUtils) public utils: WeekUtils
  ) {}

  getDaysOfWeek(input: string) {
    let dateInt: number = parseInt(new Date(input).getDate().toString());

    let monday: Date = new Date(input);
    let month = monday.getMonth();
    let year = monday.getFullYear();
    let saturday = new Date(year, month, dateInt + 5, 23, 59);
    let mondayString: string = monday.toISOString().split('.')[0];
    let saturdayString: string = saturday.toISOString().split('.')[0];

    this.service.listSchedules(mondayString, saturdayString).subscribe({
      next: (response) => {
        this.utils.schedulesOnDay(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
