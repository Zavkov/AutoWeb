import { Component } from '@angular/core';
import { Auto, Seria, Store } from 'src/app/shared/Interfaces/Base.interface';

@Component({
  selector: 'app-auto-sale-report',
  templateUrl: './auto-sale-report.component.html',
  styleUrls: ['./auto-sale-report.component.css'],
})
export class AutoSaleReportComponent {
  store: Store[] = [];
  auto: Auto[] = [];
  seria: Seria[] = [];

  displayedColumns: string[] = [
    'id',
    'storeName',
    'seriaName',
    'blankaNumber',
    'fromNumber',
    'toNumber',
    'quantity',
    'date',
    'owner',
    'address',
  ];
}
