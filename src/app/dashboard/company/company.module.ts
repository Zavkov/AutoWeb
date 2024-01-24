import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyComponent } from './company.component';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{ path: '', component: CompanyComponent }];

@NgModule({
  declarations: [
    AddComponent,
    EditComponent
  ],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class CompanyModule { } 
 