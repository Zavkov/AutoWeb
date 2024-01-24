import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Company,
  IssuedPassport,
  Seria,
  User,
  Vehicle,
} from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-reference-account-carnumber',
  templateUrl: './reference-account-carnumber.component.html',
  styleUrls: ['./reference-account-carnumber.component.css'],
})
export class ReferenceAccountCarnumberComponent {
  company: Company[];
  user: User[];
  seria: Seria[];
  vehicle: Vehicle[];
  issuedPassport: IssuedPassport[];
  formGroup: FormGroup;
  constructor(private service: BaseService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      blankNumber: [null, Validators.required],
      companyId: [null, Validators.required],
      vehicleId: [null, Validators.required],
      seriaId: [null],
      issuedPassportId: [null],
      dateSaled: [Date.now],
      carNumber: [null, Validators.required],
      address: [null],
      saleFio: [null, Validators.required],
      saleSPassport: [null, Validators.required],
      saleNPassport: [null, Validators.required],
      datePassportGetSale: [null],
      buyFio: [null, Validators.required],
      buySPassport: [null, Validators.required],
      buyNPassport: [null, Validators.required],
      whomGetPassportBuy: [null],
      datePassportGetBuy: [null],
      certificatePermissionCarNumber: [null, Validators.required],
      price: [null, Validators.required],
      pricePercent: [null],
    });
    this.service.getCompany().subscribe((res) => {
      this.company = res;
    });
    this.service.getSeria().subscribe((res) => {
      this.seria = res;
    });
    this.service.getUsers(1, 1000).subscribe({
      next: (v) => (this.user = v.result),
    });
    this.service.getVehicle().subscribe((res) => {
      this.vehicle = res;
    });
    this.service.getIssuedPassport().subscribe((res) => {
      this.issuedPassport = res;
    });
  }
}
