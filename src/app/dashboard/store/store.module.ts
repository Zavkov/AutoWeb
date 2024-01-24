import { AddComponent } from './add/add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { NgModule } from '@angular/core';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{ path: '', component: StoreComponent }];

@NgModule({
  declarations: [StoreComponent, AddComponent, EditComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class StoreModule {}
