import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { functionalsTranslation } from 'src/app/translations/functionals';
import { DeleteComponent } from '../Dialogs/delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { filter, switchMap } from 'rxjs';
import { AddComponent } from './add/add.component';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  standalone: true,
  imports: [MatTableModule],
})
export class RoleComponent implements OnInit {
  form: FormGroup;
  functionalsTranslation = functionalsTranslation;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
roles: Role[] = [];
functionals: string[] = [];


constructor(
  private dialog: MatDialog,
  private Service: BaseService,
  public accessControlService: AccessControlService
) 
{ 
  this.form = new FormGroup({
    roleName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    functionalName: new FormControl(null, [Validators.required]),
  });
}
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
  
  // openDeleteDialog(id: number): void {
  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     data: id,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.Service.deleteCity(id).subscribe({
  //         next: () => {
  //           this.getRolesData();
  //         },
  //       });
  //     }
  //   });
  // }
  // private openDialog(entity: any) {
  //   return this.dialog.open(EditComponent, {
  //     data: entity,
  //     disableClose: true,
  //     maxHeight: '95vh',
  //     width: '500px',
  //   }).afterClosed()
  //     .pipe(filter((result: any) => !!result));
  // }

   
  onEdit(id: number, name: string, roleFunctionals: string[]) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: {
        id: id,
        name: name,
        functionals: roleFunctionals,
        functionalsAll: this.functionals,
      },
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRolesData();
      }
    });

  }
  openDeleteDialog(id: number, name: string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: name,
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




  private AddDialog(entity: any) {
    return this.dialog.open(AddComponent, {
      data: entity,
      disableClose: true,
      maxHeight: '95vh',
      width: '500px',
    }).afterClosed()
      .pipe(filter((result: any) => !!result));
  }

  OnAddClick() {
    this.AddDialog({}).pipe(
      switchMap((newEntity: any) => {
        return this.Service.addRole(newEntity);
      })
    ).subscribe((res) => {
      this.ngOnInit();
    });
  }




}
