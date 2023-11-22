import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
path:'', canActivate:[AuthGuard], 
loadChildren:()=>import('./dashboard/dashboard.module')
.then((m)=>m.DashboardModule),
},
{
  path:'login',
  loadChildren:()=>import('./login/login.module').then((m)=>m.LoginModule),
},
{
  path: '**',
  redirectTo: '',
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
