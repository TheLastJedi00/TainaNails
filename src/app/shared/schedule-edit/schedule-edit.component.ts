import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { SchedulesService } from '../../core/services/schedules.service';

@Component({
  selector: 'app-schedule-edit',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule
],
  templateUrl: './schedule-edit.component.html',
  styleUrl: './schedule-edit.component.scss'
})
export class ScheduleEditComponent {
  valueName: string = this.data.name;
  valuePhone: string = this.data.phone;
  valueId: number = this.data.id;
  newName: FormControl = new FormControl(this.valueName);
  newPhone: FormControl = new FormControl(this.valuePhone);

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: {id: number, name: string, phone: string},
  private schedulesService: SchedulesService  
) {}

  form: FormGroup = new FormGroup({
    newName: this.newName,
    newPhone: this.newPhone
  });


  updateSchedule(name: string, phone: string){
    let scheduleUpdate = {
      id: this.valueId,
      name: name,
      phone: phone
    }

    this.schedulesService.updateSchedule(scheduleUpdate).subscribe({
      next: (res) => {
        window.location.reload();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
