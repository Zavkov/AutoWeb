import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ReferenceAccount,
  ReportByDayFetchCriteries,
  Store,
} from 'src/app/shared/Interfaces/Base.interface';
import { BaseService } from 'src/app/shared/services/base.service';
import { ReportService } from 'src/app/shared/services/report.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-report-by-day',
  templateUrl: './report-by-day.component.html',
  styleUrls: ['./report-by-day.component.css'],
})
export class ReportByDayComponent {
  store: Store[] = [];
  storeName: any;
  title: string;
  reference: ReferenceAccount[];
  totalCount: number = 0;

  displayedColumns: string[] = [
    'id',
    'referenceNumber',
    'owner',
    'storeName',
    'seriaName',
    'vehicleName',
    'issuedPassportName',
  ];
  dataSource = new MatTableDataSource<any>([]);
  form: FormGroup;

  fetchCriterias: ReportByDayFetchCriteries = Object.assign({});

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(
    private reportService: ReportService,
    private service: BaseService,
    private fb: FormBuilder,
    public datepipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource(this.reference);
  }

  ngOnInit() {
    this.title = 'Отчет по дням';
    this.form = this.fb.group({
      storeId: [[], Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      selected: [''],
    });
    this.service.getStores().subscribe((res) => {
      this.store = res;
    });
  }
  onSearch() {
    this.storeName = this.form.value.storeId.includes(0)
      ? 'Всё'
      : this.store
          .filter((item) => this.form.value.storeId.includes(item.id))
          .map((item) => item.fullname);
    this.fetchCriterias.storeId = this.form.value.storeId;
    this.fetchCriterias.fromDate = this.datepipe.transform(
      this.form.value.fromDate,
      'yyyy-MM-dd'
    );
    this.fetchCriterias.toDate = this.datepipe.transform(
      this.form.value.toDate,
      'yyyy-MM-dd'
    );
    removeEmptyFields(this.fetchCriterias);
    this.reportService.getByDays(this.fetchCriterias).subscribe((res) => {
      this.dataSource.data = res.result;
      this.totalCount = res.totalCount;
      this.setSortPagnation();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  togglePerOne() {
    if (this.allSelected.selected) {
      this.allSelected.deselect();
      return false;
    }
    const selectedStoreIds = this.form.controls['storeId'].value;
    const allStoreIds = this.store.map((item) => item.id);
    if (selectedStoreIds.length === allStoreIds.length) {
      this.allSelected.select();
    }
    return true;
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.form.patchValue({
        storeId: [...this.store.map((item) => item.id), 0],
      });
    } else {
      this.form.patchValue({
        storeId: [],
      });
    }
  }

  private setSortPagnation() {
    this.dataSource.sort = this.sort;
  }

  @ViewChild('TABLE') table: ElementRef;
  onExport() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'File.xlsx');
  }
}

export function removeEmptyFields(obj: any) {
  for (const propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName];
    }
  }
  return obj;
}
