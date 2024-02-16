import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Seria, Store } from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-add-dialog:not(p)',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  store: Store[];
  seria: Seria[];
  formGroup: FormGroup;

  constructor(
    private service: BaseService,
    private matDialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      invoiceNumber: [null, Validators.required],
      numberFrom: [null, Validators.required],
      numberTo: [null, Validators.required],
      dataSale: [null],
      storeId: [null],
      seriaId: [null],
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
  } 
  create() {
    this.matDialogRef.close(this.formGroup.value);
  }
  cancel() {
    this.matDialogRef.close();
  }
}
