import { NgModule } from '@angular/core';
import { AutoSaleReportComponent } from './auto-sale-report.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: AutoSaleReportComponent }];

@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AutoSaleReportModule {}
