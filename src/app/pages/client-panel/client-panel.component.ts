import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { SchedulesService } from '../../core/services/schedules.service';
import { _closeDialogVia, MatDialog } from '@angular/material/dialog';
import { Schedule } from '../../core/types/types';
import { ResponseDialogComponent } from '../../shared/response-dialog/response-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Timestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-client-panel',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    ReactiveFormsModule,
    MatError,
    CommonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './client-panel.component.html',
  styleUrl: './client-panel.component.scss',
})
export class ClientPanelComponent {
  codeForm!: FormGroup;
  isLoading = false;
  schedulesList: Schedule[] = [];
  displayedColumns: string[] = ['acessCode', 'clientName', 'clientPhone', 'serviceName', 'startTime'];

  constructor(
    private fb: FormBuilder,
    private scheduleServices: SchedulesService,
    private responseDialog: MatDialog,
  ) {
    this.codeForm = this.fb.group({
      code: ['', Validators.required],
    });
  }

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

  serverTimestampToDateString(timestamp: Timestamp){
    const date: Date = timestamp.toDate();
    const dateString: string = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).replace(',', '');
    
    return dateString;
  }

  search() {
    if (this.codeForm.invalid) return;
    this.isLoading = true;
    const inputCode: string = this.codeForm.value.code;
    const code = inputCode.toUpperCase();

    this.scheduleServices.listByAcessCode(code).subscribe({
      next: (schedules) => {
        this.schedulesList = schedules;
        this.isLoading = false;

        if (schedules.length === 0) {
          this.openResponseDialog(
            false,
            'file_copy_off',
            'Código não encontrado!',
            'rgba(206, 127, 127, 1)'
          );
        }
      },
      error: (error) => {
        console.error('Erro ao buscar agendamentos:', error);
        this.isLoading = false;
      },
    });
  }
}
