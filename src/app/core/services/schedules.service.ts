import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Page, Schedule, ScheduleResponse } from '../types/types';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  listSchedules(date: string, saturday: string) {
    let urlPrefix = `${this.apiUrl}/agendamento?`;
    return this.http.get<Page<ScheduleResponse>>(
      `${urlPrefix}date=${date}&saturday=${saturday}`
    );
  }

  createSchedule(schedule: Schedule): Observable<any> {
    return this.http.post<Schedule>(`${this.apiUrl}/agendamento`, schedule);
  }

  deleteSchedule(id: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/agendamento/${id}`, { headers });
  }

}
