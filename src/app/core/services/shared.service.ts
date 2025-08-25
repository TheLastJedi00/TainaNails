import { Injectable } from '@angular/core';
import { Page, ScheduleResponse } from '../types/types';
import { isEqual, isAfter, isBefore } from 'date-fns'

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isResponseValid: boolean = false;
  message: string = '';
  slotsOccupied: ScheduleResponse[] = [];

  responseValidattor(response: Page<ScheduleResponse>) {
    if (
      response &&
      response.content !== undefined &&
      response.content != null
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

  slotListBuilder(response: Page<ScheduleResponse>) {
    response.content.forEach((schedule) => {
      this.slotsOccupied.push(schedule);
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
      let start = new Date(schedule.date);
      let end = new Date(schedule.endOfService);

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
