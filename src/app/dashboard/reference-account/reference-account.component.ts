import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  Color,
  IssuedPassport,
  ReferenceAccount,
  Seria,
  Vehicle,
} from 'src/app/shared/Interfaces/Base.interface';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { NakladnoyViewComponent } from './nakladnoy-view/nakladnoy-view.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-reference-account',
  templateUrl: './reference-account.component.html',
  styleUrls: ['./reference-account.component.css'],
})
export class ReferenceAccountComponent {
  seria: Seria[];
  vehicle: Vehicle[];
  color: Color[];
  issuedPassport: IssuedPassport[];
  formGroup: FormGroup;
  isChecked: boolean = false;
  Disabled:boolean = false;

  constructor(
    private service: BaseService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public accessControlService: AccessControlService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      referenceNumber: [null, Validators.required],
      vehicleId: [null, Validators.required],
      seriaId: [null, Validators.required],
      issuedPassportId: [null, Validators.required],
      owner: [null, Validators.required],
      ownerAddress: [null, Validators.required],
      sPassport: [null, Validators.required],
      nPassport: [null, Validators.required],
      dataIssued: [null, Validators.required],
      dataBirth: [null, Validators.required],
      contractual: [false],
      vehicleModel: [null, Validators.required],
      vehicleType: [null, Validators.required],
      vehiclePlace: [null, Validators.required],
      vehicleShasi: [null, Validators.required],
      vehicleKuzov: [null, Validators.required],
      vehicleRama: [null, Validators.required],
      colorId: [null, Validators.required],
      vehicleDataProFrom: [null, Validators.required],
      vehiclePrice: [null],
      priceProps: [null],
      vehicleRegistrationCertificate: [null, Validators.required],
      licenceNumber: [null, Validators.required],
      whomIssued: [null, Validators.required],
      dateLiceTo: [null, Validators.required],
      dateLiceFrom: [null, Validators.required],
      tranzitNumber: [null, Validators.required],
    });
    if (this.dialog) {
      this.formGroup.patchValue(this.dialog);
    }
    this.service.getSeria().subscribe((res) => {
      this.seria = res;
    });
    this.service.getVehicle().subscribe((res) => {
      this.vehicle = res;
    });
    this.service.getIssuedPassport().subscribe((res) => {
      this.issuedPassport = res;
    });
    this.service.getColors().subscribe((res) => {
      this.color = res;
    });
  }

  public OpenDialog(entity: any) {
    const formValues: ReferenceAccount = this.formGroup.value;
    return this.dialog
      .open(NakladnoyViewComponent, {
        data: {
          form: formValues,
          seria: this.seria.find((s) => s.id == formValues.seriaId)?.name,
          IssuedPassport: this.issuedPassport.find(
            (i) => i.id == formValues.issuedPassportId
          )?.name,
          color: this.color.find((c) => c.id == formValues.colorId)?.name,
          vehicle: this.vehicle.find((v) => v.id == formValues.vehicleId)?.name,
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
          return this.service.addReferenceAccount(this.formGroup.value);
        })
      )
      .subscribe((res) => {
        this.ngOnInit();
      });
  }
  onCheckboxChange(): void {
    if (this.isChecked) {
      this.Disabled = true;
    } else {
      this.Disabled = false;
    }
  }
}
