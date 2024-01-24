import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SeriaComponent } from './seria.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [{ path: '', component: SeriaComponent }];

@NgModule({
  declarations: [AddComponent, EditComponent],
  imports: [SharedModule, RouterModule.forChild(routes), MatFormFieldModule],
})
export class SeriaModule {}
