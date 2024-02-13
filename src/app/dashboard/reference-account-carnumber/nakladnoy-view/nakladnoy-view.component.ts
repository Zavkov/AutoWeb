import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccessControlService } from 'src/app/shared/services/access-control.service';

@Component({
  selector: 'app-nakladnoy-view',
  templateUrl: './nakladnoy-view.component.html',
  styleUrls: ['./nakladnoy-view.component.css'],
})
export class NakladnoyViewComponent {
  storeName: string;
  firstName: string = '';
  secondName: string = '';
  disabled = false;
  constructor(
    private dialogRef: MatDialogRef<NakladnoyViewComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public accessControlService: AccessControlService
  ) {
    this.getfirstName();
  }

  private getfirstName(): void {
    this.accessControlService.getUserInfo().subscribe((username) => {
      this.firstName = username!.firstName;
      this.secondName = username!.secondName;
      this.storeName = username!.storeName;
    });
  } 

  closeDialog() {
    this.dialogRef.close();
  }

  OnAddClick() {
    this.dialogRef.close(true);
  }

}
