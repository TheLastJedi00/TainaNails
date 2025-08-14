import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScheduleInfoComponent } from '../../shared/schedule-info/schedule-info.component';
import { ScheduleWeekComponent } from '../../shared/schedule-week/schedule-week.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatDividerModule,
    CommonModule,
    MatDialogModule,
    CommonModule
  ],
  providers: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  normalDaySlots: number[] = [14, 15, 16, 17, 18];
  wednesdaySlots: number[] = [15, 16, 17, 18];
  saturdaySlots: number[] = [8, 9, 10, 11, 14, 15, 16, 17, 18];
  weekdays: string[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  selectedDate!: Date;
  dayList: string[] = [];


  slotIsAvailable(slot: number, weekday: string): string {
    let morningTime: boolean = slot < 12;
    let isSaturday: boolean = weekday === 'Sáb';
    let isWednesday: boolean = weekday === 'Qua';
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

  openScheduleInfo(slot: number, weekday: string, selectedDate: string) {
    this.dialog.open(ScheduleInfoComponent, {
      data: {
        timeSlot: slot,
        weekDay: weekday,
        selectedDate: selectedDate,
      },
    });
  }

  openScheduleWeek() {
    const selectedDate = this.dialog.open(ScheduleWeekComponent, {});

    selectedDate.afterClosed().subscribe((date: Date) => {
      if(date){
        this.selectedDate = date;
      }
    });
  }

  dayIterator(index: number): string {
    const selectedDay = this.selectedDate;
    const day = selectedDay.getDate() + index;
    const month = this.selectedDate.getMonth();
    const year = this.selectedDate.getFullYear();

    return new Date(year, month, day).toLocaleDateString().split(`/${year}`)[0];
  }

  openScheduleStepper() {
    this.dialog.open(DialogComponent, {});
  }

  
}
