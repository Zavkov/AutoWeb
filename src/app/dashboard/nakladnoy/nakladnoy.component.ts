import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Blanka,
  Company,
  IBlankaOperation,
  IBlankaOperationNakladnoy,
  Seria,
  User,
} from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { NakladnoyFormComponent } from './nakladnoy-form/nakladnoy-form.component';

@Component({
  selector: 'app-nakladnoy',
  templateUrl: './nakladnoy.component.html',
  styleUrls: ['./nakladnoy.component.css'],
})
export class NakladnoyComponent implements OnInit {
  blankaForm: FormGroup;
  blankaOperationForm: FormGroup;
  page = 4;
  isLoaded: boolean;
  blanka: Blanka[];
  blankaOperations: IBlankaOperation[];
  seria: Seria[];
  company: Company[];
  user: User[];
  title = '';
  selectedBlanka: Blanka;
  blankaOperationNakladnoy: IBlankaOperationNakladnoy;
  dataSource: any;

  constructor(
    private service: BaseService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.blankaForm = this.fb.group({
      invoiceNumber: [null, Validators.required],
      numberFrom: [null, Validators.required],
      numberTo: [null, Validators.required],
      dataSale: [Date.now],
      companyId: [null],
      seriaId: [null],
      userId: [this.service.getUserInfo()],
    });
    this.service.getSeria().subscribe((res) => {
      this.seria = res;
    });
    this.service.getCompany().subscribe((res) => {
      this.company = res;
    });
    this.service.getUsers(1, 1000).subscribe({
      next: (v) => (this.user = v.result),
    });
    this.service.getBlanks().subscribe({
      next: (res) => {
        this.blanka = res;
      },
      error: console.log,
    });
    this.loadBlankaOperateion();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadBlankaOperateion() {
    this.blankaOperationForm = this.fb.group({
      invoiceNumber: [''],
      isUsed: [false],
      seriaName: [null],
    });
  }

  getBlankasOfSelectedRequest(blanka: Blanka) {
    this.blanka.forEach((element) => {
      element.isSelected = false;
    });
    this.selectedBlanka = blanka;
    this.selectedBlanka.isSelected = true;
    this.blankaForm.reset();
    this.isLoaded = true;
    let data = this.blankaOperationForm.value;
    data.blankaId = this.selectedBlanka.id;
    this.service.searchNakladnoyOperation(data).subscribe((res) => {
      this.blankaOperations = res;
      this.isLoaded = false;
    });
  }
  onNewRequestClick() {
    if (+this.blankaForm.value.numberFrom > +this.blankaForm.value.numberTo) {
      this.snackBar.open('Введите правильный диапазон!'),
        'Оповещения',
        {
          duration: 5000,
        };
    } else {
      this.service.addBlanka(this.blankaForm.value).subscribe((nak) => {
        this.blanka.push(nak);
        this.blankaForm.reset();
      });
    }
  }
  info(s: any, n: any) {
    const params = {
      balnkNumber: n,
      seria: s,
    };
    var data = {};
    this.service
      .getByBlankNumber(params, 'get-by-blank-number')
      .subscribe((res) => {
        //this.blankaOperationNakladnoy = res;
        data = res;
        this.dialog.open(NakladnoyFormComponent, {
          width: '700px',
          data: Object.assign({ data }),
          disableClose: false,
        });
      });
  }
  searchNakladnoyOperation() {
    let data = this.blankaOperationForm.value;
    data.blankaId = this.selectedBlanka.id;
    this.service.searchNakladnoyOperation(data).subscribe((res) => {
      this.blankaOperations = res;
    });
  }
}
