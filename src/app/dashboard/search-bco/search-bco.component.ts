import { Component } from '@angular/core';
 import { FormBuilder, FormGroup, } from '@angular/forms';
 import { MatDialog } from '@angular/material/dialog';
// import {
//   Subject,
//   debounceTime,
//   distinctUntilChanged,
//   filter,
//   switchMap,
// } from 'rxjs';
 import { ReferenceAccount, Seria } from 'src/app/shared/Interfaces/Base.interface';
 import { AccessControlService } from 'src/app/shared/services/access-control.service';
 import { BaseService } from 'src/app/shared/services/base.service';
// import { ViewInfoComponent } from './view-info/view-info.component';

@Component({
  selector: 'app-search-bco',
  templateUrl: './search-bco.component.html',
  styleUrls: ['./search-bco.component.css'],
})
export class SearchBcoComponent {
 form: FormGroup;

 referenceAccount: ReferenceAccount[] = [];
 seria: Seria[] = [];
  // searchBlankaNumber: string | null = null;
  // searchBlankaNumber$ = new Subject<string>();
 seriaNames: { [id: number]: string } = {};
 seriaId: number | null = null;

  constructor(
   private dialog: MatDialog,
     private Service: BaseService,
     public accessControlService: AccessControlService,
    private fb: FormBuilder 
   ) {}

  // ngOnInit() {
  //   this.form = this.fb.group({
  //     seriaId: [null, Validators.required],
  //     blankNumber: [null, Validators.required],
  //   });
  //   this.searchBlankaNumber$
  //     .pipe(debounceTime(2000), distinctUntilChanged())
  //     .subscribe(() => {
  //       this.onSearchInputChange();
  //     });
  //   // this.getAutos();
  //   this.getSeria();
  // }

  // // getAutos() {
  // //   this.Service.getSearch(this.seriaId, this.searchBlankaNumber).subscribe({
  // //     next: (res) => {
  // //       this.auto = res;
  // //     },
  // //   });
  // // }
   getSeria() {
   this.Service.getSeria().subscribe({
      next: (res) => {
       this.seria = res;
       },
   });
  // }
  // handlePaymentNumberInput(event: any) {
  //   this.searchBlankaNumber$.next(event.target.value);
  // }

  // clearFullNameInput() {
  //   this.searchBlankaNumber = null;
  //   this.onSearchInputChange();
  // }

  // onSearchInputChange() {
  //   // this.getAutos();
  //   this.getSeria();
  // }

  // blankSearch() {
  //   const seriaId = this.form.get('seriaId')?.value;
  //   const blankNumber = this.form.get('blankNumber')?.value;
  //   this.dialog.open(ViewInfoComponent, {
  //     width: '500px',
  //     data: { seriaId: seriaId, blankNumber: blankNumber },
  //   });
  // }
   }
}
