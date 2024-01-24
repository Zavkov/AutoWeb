import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Auto } from 'src/app/shared/Interfaces/Base.interface';
// import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css'],
})
export class ViewInfoComponent {
  // info: Auto[] = [];
  // displayedColumns: string[] = [
  //   'seriaName',
  //   'blankaNumber',
  //   'dataSale',
  //   'storeName',
  //   'owner',
  //   'ownerAddress',
  //   'passportSeria',
  //   'passportGetPlace',
  //   'passportDate',
  //   'sale',
  //   'model',
  //   'seats',
  //   'chassis',
  //   'body',
  //   'frame',
  //   'color',
  //   'productionYear',
  //   'price',
  //   'lincencNumber',
  //   'registrationCertificate',
  //   'transit',
  //   'userName',
  // ];
  // dataSource = this.info;
  // constructor(
  //   public dialogRef: MatDialogRef<ViewInfoComponent>,
  //   @Inject(MAT_DIALOG_DATA)
  //   public data: { seriaId: number; blankNumber: string },
  //   private Service: BaseService
  // ) {}

  // ngOnInit() {
  //   this.Service.getSearch(this.data.seriaId, this.data.blankNumber).subscribe({
  //     next: (res) => {
  //       if (res !== null) {
  //         this.info = [res];
  //       }
  //     },
  //   });
  // }
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

  // onYesClick(): void {
  //   this.dialogRef.close(true);
  // }
}
