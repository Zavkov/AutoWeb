import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [{ path: '', component: CityComponent }];


@NgModule({
  declarations: [CityComponent, DeleteComponent, EditComponent, AddComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class CityModule { }
