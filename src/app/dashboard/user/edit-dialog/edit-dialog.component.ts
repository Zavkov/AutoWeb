import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role, Store } from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit{
  roles: Role[];
  stores:Store[]; 
  formGroup:FormGroup; 
 
constructor(
  private service:BaseService,
  private matDialogRef: MatDialogRef<EditDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder
) {}
  
  ngOnInit() {
    this.formGroup = this.fb.group({
      id:[null],
      firstName:[null, Validators.required],
      secondName:[null, Validators.required],
      surname:[null, Validators.required],
      phone:[null],
      address:[null], 
      position:[null], 
      username:[null, Validators.required],
      password:[null, Validators.required], 
      roleId:[null], 
      storeId:[null]  
    });
    if(this.dialogData.id){
      this.formGroup.patchValue(this.dialogData);
    }
    this.service.getStores().subscribe((res)=>{
      this.stores = res;
    });
    this.service.getRoles().subscribe((res)=>{
      this.roles = res;
    })
  }
  create() {
    this.matDialogRef.close(this.formGroup.value);
  }
  cancel() {
    this.matDialogRef.close();
  }

}