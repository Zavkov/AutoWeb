import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferenceAccountCarnumberComponent } from './reference-account-carnumber.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: ReferenceAccountCarnumberComponent },
];

@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ReferenceAccountCarnumberModule {}
