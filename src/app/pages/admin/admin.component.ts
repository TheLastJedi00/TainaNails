import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScheduleInfoComponent } from '../../shared/schedule-info/schedule-info.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatDividerModule,
    CommonModule,
    MatDialogModule,
  ],
  providers: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  normalDaySlots: number[] = [14, 15, 16, 17, 18];
  wednesdaySlots: number[] = [15, 16, 17, 18];
  saturdaySlots: number[] = [8, 9, 10, 11, 14, 15, 16, 17, 18];
  weekdays: string[] = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  slotIsAvailable(slot: number, weekday: string): string {
    let morningTime: boolean = slot < 12;
    let isSaturday: boolean = weekday === 'Sábado';
    let isWednesday: boolean = weekday === 'Quarta';
    if ((!isSaturday && morningTime) || (isWednesday && slot < 15)) {
      return 'basic';
    }
    return 'accent';
  }
  slotFontColor(theme: string) {
    if (theme === 'basic') {
      return '#c7c7c7ff';
    }
    return 'white';
  }
  
  constructor(public dialog: MatDialog) {}

  openDialog(slot: number, weekday: string) {
    this.dialog.open(ScheduleInfoComponent, {
      data: {
        timeSlot: slot,
        weekDay: weekday,
      }
    });
  }
}
