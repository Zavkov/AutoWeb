import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { functionalsTranslation } from 'src/app/translations/functionals';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  functionalsTranslation = functionalsTranslation;
  formGroup: FormGroup;
  roles: Role[] = [];
  functionals: string[] = [];

  constructor(
    private service: BaseService,
    private matDialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      id:[null],
      name: [null, Validators.required],
      functionals: [null, Validators.required],
    });
    if (this.dialogData.id) {
      this.formGroup.patchValue(this.dialogData);
    }
    this.service.getFunctionals().subscribe((res) => {
      this.functionals = res;
    });
  }

  translateFunctional(functional: string): string {
    return this.functionalsTranslation[functional] || functional;
  }
  translateFunctionals(functionals: string[]): string[] {
    return functionals.map(
      (functional) => this.functionalsTranslation[functional] || functional
    );
  }
  create() {
    this.matDialogRef.close(this.formGroup.value);
  }
  cancel() {
    this.matDialogRef.close();
  }
}
