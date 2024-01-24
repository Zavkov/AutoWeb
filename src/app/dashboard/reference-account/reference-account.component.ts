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
  selector: 'app-reference-account',
  templateUrl: './reference-account.component.html',
  styleUrls: ['./reference-account.component.css'],
})
export class ReferenceAccountComponent {
  disabled = false;
  company: Company[];
  user: User[];
  seria: Seria[];
  vehicle: Vehicle[];
  issuedPassport: IssuedPassport[];
  formGroup: FormGroup;
  constructor(private service: BaseService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      referenceNumber: [null, Validators.required],
      companyId: [null, Validators.required],
      vehicleId: [null, Validators.required],
      seriaId: [null, Validators.required],
      issuedPassportId: [null],
      owner: [null, Validators.required],
      ownerAddress: [null],
      sPassport: [null, Validators.required],
      nPassport: [null, Validators.required],
      dataIssued: [null],
      dataBirth: [null],
      vehicleModel: [null],
      vehiclePlace: [null],
      vehicleShasi: [null],
      vehicleKuzov: [null],
      vehicleRama: [null],
      vehicleColor: [null],
      vehicleDataProFrom: [null],
      contractual: [null],
      vehiclePrice: [null, Validators.required],
      priceProps: [null, Validators.required],
      vehicleRegistrationCertificate: [null],
      licenceNumber: [null, Validators.required],
      whomIssued: [null],
      dateLiceTo: [null, Validators.required],
      dateLiceFrom: [null],
      tranzitNumber: [null],
      comment: [null],
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
