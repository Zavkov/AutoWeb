import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NakladnoyFormComponent } from './nakladnoy-form/nakladnoy-form.component';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { NakladnoyComponent } from './nakladnoy.component';

const routes: Routes = [{ path: '', component: NakladnoyComponent }];

@NgModule({
  declarations: [NakladnoyFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    DecimalPipe,
    FormsModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
  ],
})
export class NakladnoyModule {}
