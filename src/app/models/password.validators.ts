import { AbstractControl } from '@angular/forms';
export class PasswordValidators{
    static passwordMatches(control: AbstractControl){
        const newPassword = control.get('password');
        const confirmPassword = control.get('confirmPwrd');

        if (newPassword.value !== confirmPassword.value)
            return { passwordMatches: true };

        return null;
    }
}
