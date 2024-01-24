import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    SharedModule
  ]
})
export class LoginModule {}
