import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  host: {'some-binding': 'some-value'}
})
export class EditComponent implements OnInit {
  formGroup:FormGroup;
  
  constructor(
    private matDialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private fb: FormBuilder
  ) {} 

  ngOnInit(): void {
   this.formGroup = this.fb.group({
    id:[null],
    name:[null, Validators.required]
   });
   if(this.dialogData.id){
    this.formGroup.patchValue(this.dialogData);
   }
  }
  create() {
    this.matDialogRef.close(this.formGroup.value);
  }
  cancel() {
    this.matDialogRef.close();
  }
}
 