import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  formGroup:FormGroup;
 
  constructor(
    private matDialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private fb: FormBuilder
  ) {}
  
  ngOnInit() {
   this.formGroup = this.fb.group({
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
