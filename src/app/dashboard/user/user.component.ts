import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subject, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { Role, Store, User } from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { DeleteModelComponent } from './delete-model/delete-model.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  form: FormGroup;
  displayedColumns = [
    'id',
    'firstName',
    'secondName',
    'surname',
    'phone',
    'address',
    'position',
    'roleName',
    'storeName',
    'username',
    'actions',
  ];
  users: User[] = [];
  pageSize: number = 10;
  pageIndex: number = 0;
  totalItemsCount: number = 0;
  pageSizeOptions: number[] = [10, 20, 50, 100];
  searchFullNameQuery: string = '';
  searchFullNameQuery$ = new Subject<string>();
  roles: Role[] = [];
  stores: Store[] = [];
  storeNames: { [id: number]: string } = {};
  storeId: number | null = null;
  
  constructor(
    private dialog: MatDialog,
    private Service: BaseService,
    public accessControlService: AccessControlService
  ) {}
  ngOnInit() {
    this.searchFullNameQuery$
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(() => {
        this.onSearchInputChange();
      });
    this.getUsers();
    this.getRolesData();
    this.getStorsData();
  }

  handlePaymentNumberInput(event: any) {
    this.searchFullNameQuery$.next(event.target.value);
  }
  getRolesData() {
    this.Service.getRoles().subscribe({
      next: (v) => {
        this.roles = v;
      },
    });
  }
  getStorsData() {
    this.Service.getStores().subscribe({
      next: (v) => {
        this.stores = v;
        for (let store of this.stores) {
          if (store.id !== undefined) {
            this.storeNames[store.id] = store.fullname;
          }
        }
      },
    });
  }
  clearFullNameInput() {
    this.searchFullNameQuery = '';
    this.onSearchInputChange();
  }

  onSearchInputChange() {
    this.getUsers();
  }

  onPageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }
  getUsers() {
    this.Service
      .getUsers(
        this.pageIndex + 1,
        this.pageSize,
        this.searchFullNameQuery,
        this.storeId
      )
      .subscribe({
        next: (v) => {
        
          this.users = v.result;
          this.pageSize = v.page;
          this.pageIndex = v.currentPage - 1;
          this.totalItemsCount = v.totalCount;
     
        },
      });
  }
  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteModelComponent, {
      data: id,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Service.deleteUser(id).subscribe({
          next: () => {
            this.getUsers();
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
      width: '500px',
    }).afterClosed()
      .pipe(filter((result: any) => !!result));
  }

  onEdit(entity: any) {
    this.openDialog(entity).pipe(
      switchMap((entityUp: any) => {
        return this.Service.updateUser(entityUp);
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
      width: '500px',
    }).afterClosed()
      .pipe(filter((result: any) => !!result));
  }

  OnAddClick() {
    this.AddDialog({}).pipe(
      switchMap((newEntity: any) => {
        return this.Service.addUser(newEntity);
      })
    ).subscribe((res) => {
      this.ngOnInit();
    });
  }
}
