import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Page, Schedule, ScheduleResponse, ScheduleUpdate } from '../types/types';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private readonly apiUrl: string = environment.apiUrl;
  private schedulesCollection: AngularFirestoreCollection<Schedule>;

  constructor(private http: HttpClient, private tokenService: TokenService, private firestore: AngularFirestore) {
    this.schedulesCollection = this.firestore.collection<Schedule>('schedules');
  }

  listSchedules(date: string, saturday: string) {
    let urlPrefix = `${this.apiUrl}/agendamento?`;
    return this.http.get<Page<ScheduleResponse>>(
      `${urlPrefix}date=${date}&saturday=${saturday}`
    );
  }

  createSchedule(schedule: Omit<Schedule, 'id' | 'createdAt'>): Promise<DocumentReference<Schedule>> {
    return this.schedulesCollection.add(schedule);
  }

  deleteSchedule(id: number): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/agendamento/${id}`, { headers });
  }

  updateSchedule(update: ScheduleUpdate): Observable<any> {
    const token = this.tokenService.getToken();
    console.log(update);
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ScheduleUpdate>(
      `${this.apiUrl}/agendamento`, update, { headers });
  }

}
