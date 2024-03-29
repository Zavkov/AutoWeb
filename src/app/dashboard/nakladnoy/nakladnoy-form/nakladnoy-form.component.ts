import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBlankaOperationNakladnoy } from 'src/app/shared/Interfaces/Base.interface';

@Component({
  selector: 'app-nakladnoy-form',
  templateUrl: './nakladnoy-form.component.html',
  styleUrls: ['./nakladnoy-form.component.css'],
})
export class NakladnoyFormComponent {
  form: FormGroup;
  operData: IBlankaOperationNakladnoy;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NakladnoyFormComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }
}
