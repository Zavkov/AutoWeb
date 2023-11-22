import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { functionalsTranslation } from 'src/app/translations/functionals';
interface Data {
  id: number;
  name: string;
  functionals: string[];
  functionalsAll: string[];
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  add: boolean = false;
  buttonText: string = 'Добавить';
  formGroup:FormGroup;
  roles: Role[] = [];
  functionals: string[] = [];
  functionalsTranslation = functionalsTranslation;
  data: Data;
  
  
  constructor(
    public accessControlService: AccessControlService,
    private dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: Data,
    private Service: BaseService
  ) {
    this.data = data;
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      roleName:new FormControl(null,[
        Validators.required,
        Validators.minLength(3),
      ]),
      functionalName: new FormControl(null,[
        Validators.required
      ]),
    });
    if(this.dialogRef.id){
      this.formGroup.patchValue(this.dialogRef);
    }
  }
  translateFunctional(functional: string): string {
    return this.functionalsTranslation[functional] || functional;
  }

  onSubmit() {
    const roleNameControl = this.formGroup.get('roleName');
    const functionalNameControl = this.formGroup.get('functionalName');
    if (roleNameControl && functionalNameControl) {
      const role: Role = {
        name: roleNameControl.value,
        functionals: functionalNameControl.value,
      };
      this.Service.addRole(role).subscribe({
        next: () => {
          this.getRolesData();
        },
      });
      this.dialogRef.close(this.formGroup.value);
    }
  }
  cancel(): void {
    this.dialogRef.close();
  }
  getRolesData() {
    this.Service.getRoles().subscribe({
      next: (v) => {
        this.roles = v;
      },
    });
  }
    toggleButton() {
    this.add = !this.add;
    this.buttonText = this.add ? 'Закрыть' : 'Добавить';
  }
}
