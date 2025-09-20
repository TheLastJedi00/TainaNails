import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { SchedulesService } from '../../core/services/schedules.service';
import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';
import { ScheduleUpdate } from '../../core/types/types';

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
  valueId: string = this.data.id;
  newName: FormControl = new FormControl(this.valueName);
  newPhone: FormControl = new FormControl(this.valuePhone);

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data: {id: string, name: string, phone: string},
  private schedulesService: SchedulesService  ,
  public responseDialog: MatDialog
) {}

  form: FormGroup = new FormGroup({
    newName: this.newName,
    newPhone: this.newPhone
  });

  openResponseDialog(
      isLoading: boolean,
      matIcon?: string,
      title?: string,
      iconColor?: string,
      description?: string,
      strong?: string
    ) {
      const dialogRef = this.responseDialog.open(ResponseDialogComponent, {
        data: {
          isLoading: isLoading,
          matIcon: matIcon,
          title: title,
          iconColor: iconColor,
          description: description,
          strong: strong,
        },
      });
    }

  updateSchedule(name: string, phone: string){
    let scheduleUpdate: ScheduleUpdate = {
      id: this.valueId,
      name: name,
      phone: phone
    }

    const response = this.responseDialog.open(ResponseDialogComponent, {
      data: { isLoading: true },
    });

    this.schedulesService.updateSchedule(scheduleUpdate).then(() => {
      console.log('Schedule updated successfully');
      response.close();
      this.openResponseDialog(false, 'check_circle', 'Agendamento atualizado com sucesso!', 'rgb(127, 206, 145)', 'Recarregue a página pra atualizar as alterações.');
    }).catch((error) => {
      console.error('Error updating schedule:', error);
      response.close();
      this.openResponseDialog(false, 'error', 'Infelizmente houve um erro', 'rgb(206, 127, 127)');
    });
  }
}
