import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City, Company } from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit:not(p)',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formGroup: FormGroup;
  company:Company[];
  city:City[];

  constructor(
    private service:BaseService,
    private matDialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private fb: FormBuilder
  ) {}
 
  ngOnInit() { 
    this.formGroup = this.fb.group({
      fullname:[null, Validators.required],
      address:[null, Validators.required],
      cityId:[null, Validators.required],
      companyId:[null, Validators.required],
      inn:[null],
      statement:[null],  
      certificate:[null], 
      director:[null, Validators.required],
      datePoliceConclusion:[null],
      endDatePoliceConclusion:[null],
   });
   if(this.dialogData.id){
    this.formGroup.patchValue(this.dialogData);

  }
  this.service.getCities().subscribe((res)=>{
    this.city = res;
  });
  this.service.getCompany().subscribe((res)=>{
    this.company = res;
  })
}
create() {
  this.matDialogRef.close(this.formGroup.value);
}
cancel() {
  this.matDialogRef.close();
}
  
}
