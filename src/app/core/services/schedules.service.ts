import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Schedule } from '../types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  // The API URL is set based on the environment configuration
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listSchedules(date: string) {
    return this.http.get<Schedule[]>(`${this.apiUrl}/agendamento?date=${date}T00:00`);
  }

  createSchedule(schedule: Schedule): Observable<any> {
    return this.http.post<Schedule>(`${this.apiUrl}/agendamento`, schedule);
  }
}
