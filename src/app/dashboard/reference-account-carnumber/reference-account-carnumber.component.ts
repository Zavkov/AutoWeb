import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { NakladnoyViewComponent } from './nakladnoy-view/nakladnoy-view.component';
import {
  IssuedPassport,
  ReferenceAccountCarnumber,
  Seria,
  Store,
} from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';

@Component({
  selector: 'app-reference-account-carnumber',
  templateUrl: './reference-account-carnumber.component.html',
  styleUrls: ['./reference-account-carnumber.component.css'],
})
export class ReferenceAccountCarnumberComponent implements OnInit {
  seria: Seria[];
  formGroup: FormGroup;
  issuedPassport: IssuedPassport[];

  constructor(
    private service: BaseService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    public accessControlService: AccessControlService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({ 
      blankNumber: [null, Validators.required],
      seriaId: [null, Validators.required],
      placeRegistration: [null, Validators.required],
      carNumber: [null, Validators.required],
      address: [null, Validators.required],
      selIssuedPassportId: [null, Validators.required],
      buyIssuedPassportId: [null, Validators.required],
      saleFio: [null, Validators.required],
      saleSPassport: [null, [Validators.required, Validators.pattern('[A-Z]')]],
      saleNPassport: [null, Validators.required],
      datePassportGetSale: [null, Validators.required],
      buyFio: [null, Validators.required],
      buySPassport: [null, [Validators.required, Validators.pattern('[A-Z]')]],
      buyNPassport: [null, Validators.required],
      datePassportGetBuy: [null, [Validators.required]],
      certificatePermissionCarNumber: [null, Validators.required],
      price: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      pricePercent: [
        null,
        [Validators.required, Validators.pattern('^\\d+(\\.\\d{1,2})?$')],
      ],
    });
    if (this.dialog) {
      this.formGroup.patchValue(this.dialog);
    }
    this.service.getSeria().subscribe((res) => {
      this.seria = res;
    });
    this.service.getIssuedPassport().subscribe((res) => {
      this.issuedPassport = res;
    });
  }
  public OpenDialog(entity: any) {
    const formValues: ReferenceAccountCarnumber = this.formGroup.value;
    return this.dialog
      .open(NakladnoyViewComponent, {
        data: {
          form: formValues,
          seria: this.seria.find((s) => s.id == formValues.seriaId)?.name,
          selIssuedPassport: this.issuedPassport.find(
            (i) => i.id == formValues.selIssuedPassportId
          )?.name,
          buyIssuedPassport: this.issuedPassport.find(
            (i) => i.id == formValues.buyIssuedPassportId
          )?.name,
        },
        disableClose: true,
        maxHeight: '100vh',
        width: '40%',
      })
      .afterClosed()
      .pipe(filter((result: any) => !!result));
  }
  OnAddClick() {
    this.OpenDialog({}) 
      .pipe(
        switchMap((b: boolean) => {
          return this.service.addReferenceAccountCarnumber(
            this.formGroup.value
          );
        })
      )
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
}
