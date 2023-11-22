import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { ChangePasswordComponent } from './nav/change-password/change-password.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { DeleteComponent } from './Dialogs/delete/delete.component';


const routes:Routes = [
  {
    path:'', component:DashboardComponent, 
    children:[
      {
        path:'users',
        canActivate: [AuthGuard],
        // data: { requiredRoles: ['allFunctionals', 'users'] },
        title: 'Пользователи',
        loadChildren: () =>
          import('../dashboard/user/user.module').then((m) => m.UserModule),
      },
      {
        path:'roles',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../dashboard/role/role.module').then((m) => m.RoleModule),
      },
      {
        path:'cities',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../dashboard/city/city.module').then((m) => m.CityModule),
      },
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    ChangePasswordComponent,
    DeleteComponent,
  ],
  imports: [
    SharedModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
