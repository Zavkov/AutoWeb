import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePassword } from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  form: FormGroup;

  constructor(
    private Service: BaseService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
    this.form = new FormGroup({
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  submit() {
    const newPasswordControl = this.form.get('newPassword');
    const oldPasswordControl = this.form.get('oldPassword');

    if (newPasswordControl && oldPasswordControl) {
      const changedPassword: ChangePassword = {
        oldPassword: oldPasswordControl.value,
        newPassword: newPasswordControl.value,
      };
      this.Service.changePassword(changedPassword).subscribe({
        next: () => this.dialogRef.close(),
      });
    }
  }

  
}
