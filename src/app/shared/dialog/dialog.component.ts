import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
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
import { Observable, of, Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SchedulesService } from '../../core/services/schedules.service';
import { Schedule } from '../../core/types/types';

export type ScheduleInfo = {
  name: string;
  phone: string;
  service: string;
  date: Date;
  time: number;
};

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
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  services: { id: number; name: string }[];
  timeList!: number[];
  isLinear: boolean = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  name: string = '';
  phone: string = '';
  service: string = '';
  date: string = '';
  time: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private schedulesService: SchedulesService
  ) {
    this.services = [
      { id: 1, name: 'Manicure' },
      { id: 2, name: 'Pedicure' },
      { id: 3, name: 'Manicure e Pedicure' },
      { id: 4, name: 'Manicure e Pedicure Decorados' },
      { id: 5, name: 'Manicure Decorado' },
      { id: 6, name: 'Pedicure Decorado' },
      { id: 7, name: 'Manicure em Gel e Pedicure Simples' },
      { id: 8, name: 'Manicure e Pedicure com Esmaltação em Gel' },
      { id: 9, name: 'Manicure com Esmaltação em Gel' },
      { id: 10, name: 'Pedicure com Esmaltação em Gel' },
      { id: 11, name: 'Unhas Postiças' },
      { id: 12, name: 'Unhas Postiças Decoradas' },
      { id: 13, name: 'Unhas Postiças Realistas' },
      { id: 14, name: 'Unhas Postiças Realistas Decoradas' },
      { id: 15, name: 'Blindagem' },
      { id: 16, name: 'Banho de Gel' },
      { id: 17, name: 'Alongamento com fibra de vidro' },
      { id: 18, name: 'Alongamento Model F1' },
      { id: 19, name: 'Alongamento com Tip de Gel' },
      { id: 20, name: 'Alongamento com SoftGel' },
      { id: 21, name: 'Remoção de Alongamento' },
    ];

    this.timeList = [8, 9, 10, 11, 14, 15, 16, 17, 18];

    this.firstFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      phoneCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      serviceCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      dateCtrl: ['', [Validators.required, this.dateValidator]],
    });
    this.fifthFormGroup = this._formBuilder.group({
      timeCtrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.firstFormGroup.valueChanges.subscribe((value) => {
        this.name = value.nameCtrl;
      }),
      this.secondFormGroup.valueChanges.subscribe((value) => {
        this.phone = value.phoneCtrl;
      }),
      this.thirdFormGroup.valueChanges.subscribe((value) => {
        this.service = value.serviceCtrl;
      }),
      this.fourthFormGroup.valueChanges.subscribe((value) => {
        if (value.dateCtrl) {
          const date = value.dateCtrl as Date;
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          this.date = `${year}-${month}-${day}`;
        }
      }),
      this.fifthFormGroup.valueChanges.subscribe((value) => {
        this.time = value.timeCtrl;
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const date = control.value as Date;
    if (!date) {
      return null;
    }

    if (date.getDay() === 0) {
      return { sundayNotAvailable: true };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return { pastDate: true };
    }

    return null;
  }

  timeListIsEmpty(): boolean {
    return this.timeList.length === 0;
  }

  createSchedule(): void {
    const schedule: Schedule = {
      date: `${this.date}T${this.time.toString().padStart(2, '0')}:00`,
      name: this.name,
      service: this.service,
      serviceCode: this.services.find((s) => s.name === this.service)?.id || 0,
      phone: this.phone,
      dayOfWeek: new Date(this.date).toLocaleDateString('pt-BR', {
        weekday: 'long',
      }),
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
