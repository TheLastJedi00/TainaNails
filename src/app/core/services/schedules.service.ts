import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Schedule, ScheduleUpdate } from '../types/types';
import { map, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  private schedulesCollection: AngularFirestoreCollection<Schedule>;

  constructor(private firestore: AngularFirestore) {
    this.schedulesCollection = this.firestore.collection<Schedule>('schedules');
  }

  listSchedules(date: Date, saturday: Date): Observable<Schedule[]> {

    const collectionWithQuery = this.firestore.collection<Schedule>('schedules', ref => 
      ref.where('startTime', '>=', date)
         .where('startTime', '<=', saturday)
         .orderBy('startTime', 'asc')
    );
    return collectionWithQuery.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Schedule;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  createSchedule(schedule: Omit<Schedule, 'id' | 'createdAt'>): Promise<DocumentReference<Schedule>> {
    return this.schedulesCollection.add(schedule);
  }

  deleteSchedule(id: string): Promise<void> {
    return this.schedulesCollection.doc(id).update({ active: false });
  }

  updateSchedule(update: ScheduleUpdate): Promise<void> {
    return this.schedulesCollection.doc(update.id).update({
      clientName: update.name,
      clientPhone: update.phone
    });
  }

}
