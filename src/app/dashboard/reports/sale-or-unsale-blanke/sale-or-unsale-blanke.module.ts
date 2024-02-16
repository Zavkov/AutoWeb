import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SaleOrUnsaleBlankeComponent } from './sale-or-unsale-blanke.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [{ path: '', component: SaleOrUnsaleBlankeComponent }];
@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [DatePipe],
})
export class SaleOrUnsaleBlankeModule {}
