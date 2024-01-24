import { NgModule } from '@angular/core';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { IssuedPassportComponent } from './issued-passport.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{ path: '', component: IssuedPassportComponent }];
@NgModule({
  declarations: [AddComponent, EditComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class IssuedPassportModule {}
