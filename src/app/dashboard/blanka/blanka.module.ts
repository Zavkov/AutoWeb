import { NgModule } from '@angular/core';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { BlankaComponent } from './blanka.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: BlankaComponent }];

@NgModule({
  declarations: [
    BlankaComponent,
    EditDialogComponent,
    AddDialogComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class BlankaModule {}
