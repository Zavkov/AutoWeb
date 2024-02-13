import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Company, Seria, Store, User } from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { filter, switchMap } from 'rxjs';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { DeleteComponent } from '../Dialogs/delete/delete.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-blanka',
  templateUrl: './blanka.component.html',
  styleUrls: ['./blanka.component.css']
}) 
export class BlankaComponent {
  form: FormGroup;
  displayedColumns = [
    'id',
    'invoiceNumber',
    'companyName',
    'seriaName',
    'recordDate',
    'numberFrom',
    'numberTo',
    'userName',
    'action'
  ];
  
  company:Company[];
  companyName:{[id:number]:string} = {}; 
  companyId:number | null = null;

  seria:Seria[];
  seriaName:{[id:number]:string} = {}; 
  seriaId:number | null = null;

  user:User[];
  userName:{[id:number]:string} = {}; 
  userId:number | null = null;
 
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



constructor(
  private dialog: MatDialog,
  private Service: BaseService,
  public accessControlService: AccessControlService
) {}

ngOnInit() {
  this.getBlanka();
  this.getCompany();
  this.getUser();
  this.getSeria();
}
getCompany(){
  this.Service.getCompany().subscribe({
    next:(res)=>{
      this.company = res;
      for(let comp of this.company){
        if(comp.id !=undefined){
          this.companyName[comp.id] = comp.fullname
        }
      }
    }
  }) 
}
getSeria(){
  this.Service.getSeria().subscribe({
    next:(res)=>{
      this.seria = res;
      for(let seria of this.seria){
        if(seria.id !=undefined){
          this.seriaName[seria.id] = seria.name
        }
      }
    }
  })
}
getUser(){
  this.Service.getUsers(1, 1000).subscribe({
    next: (v) => (this.user = v.result),
  });
}
getBlanka(){
  this.Service.getBlanks().subscribe({
    next:(res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error: console.log,
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

openDeleteDialog(id: number): void {
  const dialogRef = this.dialog.open(DeleteComponent, {
    data: id,
  });
  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.Service.deleteBlanka(id).subscribe({
        next: () => {
          this.getBlanka();
        },
      });
    } 
  });
}
private openDialog(entity: any) {
  return this.dialog.open(EditDialogComponent, {
    data: entity,
    disableClose: true,
    maxHeight: '95vh',
    width: '800px',
  }).afterClosed()
    .pipe(filter((result: any) => !!result));
}
onEdit(entity: any) {
  this.openDialog(entity).pipe(
    switchMap((entityUp: any) => {
      return this.Service.updateBlanka(entityUp);
    })
  ).subscribe((res) => {
    this.ngOnInit();
  }); 
}
private AddDialog(entity: any) {
  return this.dialog.open(AddDialogComponent, {
    data: entity,
    disableClose: true,
    maxHeight: '95vh', 
    width: '550px',
  }).afterClosed()
    .pipe(filter((result: any) => !!result)); 
}

OnAddClick() {
  this.AddDialog({}).pipe(
    switchMap((newEntity: any) => {
      return this.Service.addBlanka(newEntity);
    })
  ).subscribe((res) => {
    this.ngOnInit();
  }); 
}

}
