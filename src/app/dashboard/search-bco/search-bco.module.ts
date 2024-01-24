import { NgModule } from '@angular/core';
import { SearchBcoComponent } from './search-bco.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewInfoComponent } from './view-info/view-info.component';

const routes: Routes = [{ path: '', component: SearchBcoComponent }];

@NgModule({
  declarations: [
    ViewInfoComponent
  ],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class SearchBcoModule { }
    