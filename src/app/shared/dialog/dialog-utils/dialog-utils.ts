import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DialogUtils {
  services: { duration: number; name: string }[] = [
    { duration: 59, name: 'Manicure' },
    { duration: 59, name: 'Pedicure' },
    { duration: 119, name: 'Manicure e Pedicure' },
    { duration: 119, name: 'Manicure e Pedicure Decorados' },
    { duration: 119, name: 'Manicure Decorado' },
    { duration: 119, name: 'Pedicure Decorado' },
    { duration: 119, name: 'Manicure em Gel e Pedicure Simples' },
    { duration: 119, name: 'Manicure e Pedicure com Esmaltação em Gel' },
    { duration: 119, name: 'Manicure com Esmaltação em Gel' },
    { duration: 119, name: 'Pedicure com Esmaltação em Gel' },
    { duration: 119, name: 'Unhas Postiças' },
    { duration: 119, name: 'Unhas Postiças Decoradas' },
    { duration: 119, name: 'Unhas Postiças Realistas' },
    { duration: 119, name: 'Unhas Postiças Realistas Decoradas' },
    { duration: 119, name: 'Blindagem' },
    { duration: 119, name: 'Banho de Gel' },
    { duration: 119, name: 'Alongamento com fibra de vidro' },
    { duration: 119, name: 'Alongamento Model F1' },
    { duration: 119, name: 'Alongamento com Tip de Gel' },
    { duration: 119, name: 'Alongamento com SoftGel' },
    { duration: 59, name: 'Remoção de Alongamento' },
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
