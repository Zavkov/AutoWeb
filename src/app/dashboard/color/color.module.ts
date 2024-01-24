import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorComponent } from './color.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [{ path: '', component: ColorComponent }];
@NgModule({
  declarations: [
    AddComponent,
    EditComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ColorModule {}
 