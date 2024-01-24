import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


const routes: Routes = [{ path: '', component: UserComponent }];

@NgModule({
  declarations: [UserComponent, EditDialogComponent, AddDialogComponent],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  
  ] 
})
export class UserModule { }
 