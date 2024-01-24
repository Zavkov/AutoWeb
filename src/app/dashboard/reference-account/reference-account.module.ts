import { NgModule } from '@angular/core';
import { ReferenceAccountComponent } from './reference-account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ReferenceAccountComponent }];

@NgModule({
  declarations: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ReferenceAccountModule {}
