import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { functionalsTranslation } from 'src/app/translations/functionals';
import { DeleteComponent } from '../Dialogs/delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { filter, switchMap } from 'rxjs';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  form: FormGroup;
  displayedColumns = ['id', 'name', 'accessRights', 'actions'];
  functionalsTranslation = functionalsTranslation;
  roles: Role[] = [];
  functionals: string[] = [];

  constructor(
    private dialog: MatDialog,
    private Service: BaseService,
    public accessControlService: AccessControlService
  ) {}

  ngOnInit() {
    this.getFunctionalsData();
    this.getRolesData();
  }
  getFunctionalsData() {
    this.Service.getFunctionals().subscribe({
      next: (v) => {
        this.functionals = v;
      },
    });
  }

  getRolesData() {
    this.Service.getRoles().subscribe({
      next: (v) => {
        this.roles = v;
      },
    });
  }

  translateFunctional(functional: string): string {
    return this.functionalsTranslation[functional] || functional;
  }

  translateFunctionals(functionals: string[]): string[] {
    return functionals.map(
      (functional) => this.functionalsTranslation[functional] || functional
    );
  }
  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Service.deleteRole(id).subscribe({
          next: () => {
            this.getRolesData();
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
          return this.Service.updateRole(entityUp);
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
          return this.Service.addRole(newEntity);
        })
      )
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
}
