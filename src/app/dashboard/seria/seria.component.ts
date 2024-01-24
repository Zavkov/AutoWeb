import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Seria } from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { DeleteComponent } from '../Dialogs/delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { filter, switchMap } from 'rxjs';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-seria',
  templateUrl: './seria.component.html',
  styleUrls: ['./seria.component.css'],
})
export class SeriaComponent {
  form: FormGroup;
  displayedColumns = ['id', 'name', 'actions'];
  seria: Seria[] = [];

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
    this.getSeriaData();
  }

  getSeriaData() {
    this.Service.getSeria().subscribe({
      next: (v) => {
        this.seria = v;
      },
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Service.deleteSeria(id).subscribe({
          next: () => {
            this.getSeriaData();
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
          return this.Service.updateSeria(entityUp);
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
          return this.Service.addSeria(newEntity);
        })
      )
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
}
