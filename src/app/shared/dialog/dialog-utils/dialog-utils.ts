import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DialogUtils {
  services: { id: number; name: string }[] = [
    { id: 1, name: 'Manicure' },
    { id: 2, name: 'Pedicure' },
    { id: 3, name: 'Manicure e Pedicure' },
    { id: 4, name: 'Manicure e Pedicure Decorados' },
    { id: 5, name: 'Manicure Decorado' },
    { id: 6, name: 'Pedicure Decorado' },
    { id: 7, name: 'Manicure em Gel e Pedicure Simples' },
    { id: 8, name: 'Manicure e Pedicure com Esmaltação em Gel' },
    { id: 9, name: 'Manicure com Esmaltação em Gel' },
    { id: 10, name: 'Pedicure com Esmaltação em Gel' },
    { id: 11, name: 'Unhas Postiças' },
    { id: 12, name: 'Unhas Postiças Decoradas' },
    { id: 13, name: 'Unhas Postiças Realistas' },
    { id: 14, name: 'Unhas Postiças Realistas Decoradas' },
    { id: 15, name: 'Blindagem' },
    { id: 16, name: 'Banho de Gel' },
    { id: 17, name: 'Alongamento com fibra de vidro' },
    { id: 18, name: 'Alongamento Model F1' },
    { id: 19, name: 'Alongamento com Tip de Gel' },
    { id: 20, name: 'Alongamento com SoftGel' },
    { id: 21, name: 'Remoção de Alongamento' },
  ];
  weekDays: string[] = [
    'DOMINGO',
    'SEGUNDA',
    'TERÇA',
    'QUARTA',
    'QUINTA',
    'SEXTA',
    'SÁBADO',
  ];
  getDayOfWeek(date: Date) {
    const day = date.getDay();
    return this.weekDays[day];
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date = control.value as Date;
      if (!date) {
        return null;
      }

      if (date.getDay() === 0) {
        return { sundayNotAvailable: true };
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        return { pastDate: true };
      }

      return null;
    };
  }

  isButtonDisabled(inputValue: AbstractControl): boolean {
    return inputValue.invalid || inputValue.pristine;
  }
}
