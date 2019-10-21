import { AbstractControl } from '@angular/forms';

export function containsCapitalLetterValidator(control: AbstractControl): { [key: string]: any } {
    const controlValue: string = control.value;
    if (controlValue === controlValue.toLowerCase() && controlValue !== '') {
        return { capitalLetterError: true };
    }
    else {
        return null;
    }
}

export function containsNumberValidator(control: AbstractControl): { [key: string]: any } {
    const controlValue: string = control.value;
    if (!/\d/.test(controlValue) && controlValue !== '') {
        return { numberError: true };
    }
    else {
        return null;
    }
}