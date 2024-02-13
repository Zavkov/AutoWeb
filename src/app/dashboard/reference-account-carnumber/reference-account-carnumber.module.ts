import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferenceAccountCarnumberComponent } from './reference-account-carnumber.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NakladnoyViewComponent } from './nakladnoy-view/nakladnoy-view.component';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: '',
    component: ReferenceAccountCarnumberComponent,
    children: [
      {
        path: 'viewForm',
        component: NakladnoyViewComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [NakladnoyViewComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
  ],
})
export class ReferenceAccountCarnumberModule {}
