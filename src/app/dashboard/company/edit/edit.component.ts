import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  city:City[];   
  formGroup:FormGroup; 
  constructor(
    private service:BaseService,
    private matDialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id:[null],
      fullname:[null, Validators.required],
      address:[null, Validators.required],
      cityId:[null, Validators.required],
      inn:[null],
      statement:[null],  
      sertificat:[null], 
      director:[null, Validators.required],
      sertificatNumber:[null, Validators.required], 
      dataSertificat:[null], 
      dataPoliceConclusion:[null],
      contractNumber:[null],
      dataContract:[null]
   });
   if(this.dialogData.id){
    this.formGroup.patchValue(this.dialogData);
  }
  this.service.getCities().subscribe((res)=>{
    this.city = res;
  })
}
create() {
  this.matDialogRef.close(this.formGroup.value);
}
cancel() {
  this.matDialogRef.close();
}
}
