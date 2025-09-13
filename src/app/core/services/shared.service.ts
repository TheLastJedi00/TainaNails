import { Injectable } from '@angular/core';
import { Page, Schedule, ScheduleResponse } from '../types/types';
import { isEqual, isAfter, isBefore } from 'date-fns'
import { SourceTextModule } from 'vm';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isResponseValid: boolean = false;
  message: string = '';
  slotsOccupied: Schedule[] = [];

  responseValidattor(response: Schedule[]) {
    if (
      response &&
      response !== undefined &&
      response != null
    ) {
      this.isResponseValid = true;
    } else {
      this.isResponseValid = false;
    }
  }

  errorCatcher(error: any) {
    this.isResponseValid = false;
    this.message = `An error occurred:, ${error}`;
  }

  slotListBuilder(response: Schedule[]) {
    response.forEach((schedule) => {
      if(schedule.active) this.slotsOccupied.push(schedule);
    });
  }

  isOccupiedSlot(timeSlot: number, daySlot: string): boolean {
    if(this.slotsOccupied.length === 0){
      return false;
    }

    let day: number = parseInt(daySlot.split('/')[0]);
    let month: number = parseInt(daySlot.split('/')[1]);
    let year: number = parseInt(daySlot.split('/')[2]);
    let slotDate: Date = new Date(year, month - 1, day, timeSlot, 0, 0);

    return this.slotsOccupied.some((schedule) => {
      let start = (schedule.startTime as Timestamp).toDate();
      let end = (schedule.endTime as Timestamp).toDate();

      return this.hasConflict(slotDate, start, end);
    });
  }

  hasConflict(date: Date, start: Date, end: Date): boolean {
    switch(true){
      case isEqual(date, start):
        return true;
      case isAfter(date, start) && isBefore(date, end):
        return true;
    }
    return false;
  }

  constructor() {}
}
