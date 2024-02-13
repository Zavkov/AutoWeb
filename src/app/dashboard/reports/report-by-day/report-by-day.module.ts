import { NgModule } from '@angular/core';
import { ReportByDayComponent } from './report-by-day.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '', component: ReportByDayComponent }];
@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [DatePipe],
})
export class ReportByDayModule {}
