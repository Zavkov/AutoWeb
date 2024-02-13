import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { City } from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { EditComponent } from './edit/edit.component';
import { filter, switchMap } from 'rxjs';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from '../Dialogs/delete/delete.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {
  form: FormGroup;
  displayedColumns = ['id', 'name', 'actions'];
  cities: City[] = [];
  constructor(
    private Service: BaseService,
    private dialog: MatDialog,
    public accessControlService: AccessControlService
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {
    this.getCitiesData();
  }

  getCitiesData() {
    this.Service.getCities().subscribe({
      next: (v) => {
        this.cities = v;
      },
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Service.deleteCity(id).subscribe({
          next: () => {
            this.getCitiesData();
          },
        });
      }
    });
  }
  private openDialog(entity: any) {
    return this.dialog
      .open(EditComponent, {
        data: entity,
        disableClose: true,
        maxHeight: '95vh',
        width: '500px',
      })
      .afterClosed()
      .pipe(filter((result: any) => !!result));
  }
  onEdit(entity: any) {
    this.openDialog(entity)
      .pipe(
        switchMap((entityUp: any) => {
          return this.Service.updateCity(entityUp);
        })
      )
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
  private AddDialog(entity: any) {
    return this.dialog
      .open(AddComponent, {
        data: entity,
        disableClose: true,
        maxHeight: '95vh',
        width: '500px',
      })
      .afterClosed()
      .pipe(filter((result: any) => !!result));
  }

  OnAddClick() {
    this.AddDialog({})
      .pipe(
        switchMap((newEntity: any) => {
          return this.Service.addCity(newEntity);
        })
      )
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
}
