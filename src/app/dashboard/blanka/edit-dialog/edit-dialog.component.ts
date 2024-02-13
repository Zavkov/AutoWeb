import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Seria, Store, User } from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit-dialog:not(p)',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  store: Store[];
  user: User[] = [];
  seria: Seria[] = [];

  formGroup: FormGroup;
  constructor(
    private service: BaseService,
    private matDialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [null],
      invoiceNumber: [null, Validators.required],
      numberFrom: [null, Validators.required],
      numberTo: [null, Validators.required],
      dataSale: [null, Validators.required],
      storeId: [null, Validators.required],
      seriaId: [null, Validators.required],
      userId: [null, Validators.required],
    });
    if (this.dialogData.id) {
      this.formGroup.patchValue(this.dialogData);
    }
    this.service.getStores().subscribe((res) => {
      this.store = res;
    });
    this.service.getSeria().subscribe((res) => {
      this.seria = res;
    });
    this.service.getUsers(1, 1000).subscribe({
      next: (v) => (this.user = v.result),
    });
  }
  create() {
    this.matDialogRef.close(this.formGroup.value);
  }
  cancel() {
    this.matDialogRef.close();
  }
}
