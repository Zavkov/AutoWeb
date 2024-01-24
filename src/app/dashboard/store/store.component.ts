import { Component, OnInit } from '@angular/core';
import {ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from 'src/app/shared/services/base.service';
import { AddComponent } from './add/add.component';
import { City, Company } from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { DeleteComponent } from '../Dialogs/delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  
  displayedColumns: string[] = [
    'id',
    'fullname',
    'cityName',
    'companyName', 
    'address',
    'inn',
    'statement',
    'certificate',
    'director',
    'datePoliceConclusion',
    'endDatePoliceConclusion',
    'action',
  ];
  city:City[];
  cityName:{[id:number]:string} = {}; 
  cityId:number | null = null;
  company:Company[];
companyName:{[id:number]:string} = {}; 
companyId:number | null = null;


  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private Service: BaseService, 
    public accessControlService: AccessControlService 
  ) {}
  
   
  ngOnInit(): void {
    this.getStore();
    this.getCompany();
    this.getCity();
  }

  getStore(){
    this.Service.getStores().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
  }

  getCity(){
    this.Service.getCities().subscribe({
      next:(res)=>{
        this.city = res;
        for(let city of this.city){
          if(city.id !==undefined){
            this.cityName[city.id] = city.name
          }
        }
      },
    });
  }
  getCompany(){
    this.Service.getCompany().subscribe({
      next:(res)=>{
        this.company = res;
        for(let company of this.company){
          if(company.id !=undefined){
            this.companyName[company.id] = company.fullname
          }
        }
      }
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
        this.Service.deleteStore(id).subscribe({
          next: () => { 
            this.getStore();
          },
        });
      }
    });
  }
  
  private openDialog(entity: any) {
    return this.dialog.open(EditComponent, {
      data: entity,
      disableClose: true,
      maxHeight: '95vh',
      width: '700px',
    }).afterClosed()
      .pipe(filter((result: any) => !!result));
  }
  
  onEdit(entity: any) {
    this.openDialog(entity).pipe(
      switchMap((entityUp: any) => {
        return this.Service.updateStore(entityUp);
      })
    ).subscribe((res) => {
      this.ngOnInit();
    });
  }
  private AddDialog(entity: any) {
    return this.dialog.open(AddComponent, {
      data: entity,
      disableClose: true,
      maxHeight: '95vh',
      width: '700px',
    }).afterClosed()
      .pipe(filter((result: any) => !!result));
  }
  
  OnAddClick() {
    this.AddDialog({}).pipe(
      switchMap((newEntity: any) => {
        return this.Service.addStore(newEntity);
      })
    ).subscribe((res) => {
      this.ngOnInit();
    });
  }
  
}
