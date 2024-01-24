import { NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule, Routes } from '@angular/router';
import { VehicleComponent } from './vehicle.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: VehicleComponent }];

@NgModule({
  declarations: [AddComponent, EditComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class VehicleModule {}
