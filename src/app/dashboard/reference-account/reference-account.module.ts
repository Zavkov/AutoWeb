import { NgModule } from '@angular/core';
import { ReferenceAccountComponent } from './reference-account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NakladnoyViewComponent } from './nakladnoy-view/nakladnoy-view.component';


const routes: Routes = [{ path: '', component: ReferenceAccountComponent }];

@NgModule({
  declarations: [NakladnoyViewComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ReferenceAccountModule {
}
