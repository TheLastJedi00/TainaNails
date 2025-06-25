import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Schedule } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  listSchedules() {
    return this.http.get<Schedule[]>(`${this.apiUrl}/agendamentos`);
  }
}
