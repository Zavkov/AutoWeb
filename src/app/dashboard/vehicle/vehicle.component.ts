import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Vehicle } from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { DeleteComponent } from '../Dialogs/delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { filter, switchMap } from 'rxjs';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent {
  form: FormGroup;
  displayedColumns = ['id', 'name', 'actions'];
  vehicle: Vehicle[] = [];

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
    this.getVehicleData();
  }

  getVehicleData() {
    this.Service.getVehicle().subscribe({
      next: (v) => {
        this.vehicle = v;
      },
    });
  }
  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Service.deleteVehicle(id).subscribe({
          next: () => {
            this.getVehicleData();
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
          return this.Service.updateVehicle(entityUp);
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
          return this.Service.addVehicle(newEntity);
        })
      )
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
}
