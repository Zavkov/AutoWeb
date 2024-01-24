import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{ path: '', component: RoleComponent }];

@NgModule({
  declarations: [AddComponent, EditComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class RoleModule {}
