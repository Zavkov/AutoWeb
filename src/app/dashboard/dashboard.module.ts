import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { ChangePasswordComponent } from './nav/change-password/change-password.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { DeleteComponent } from './Dialogs/delete/delete.component';
import { CompanyComponent } from './company/company.component';
import { SearchBcoComponent } from './search-bco/search-bco.component';
import { SeriaComponent } from './seria/seria.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { IssuedPassportComponent } from './issued-passport/issued-passport.component';
import { ReferenceAccountCarnumberComponent } from './reference-account-carnumber/reference-account-carnumber.component';
import { ReferenceAccountComponent } from './reference-account/reference-account.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { NakladnoyComponent } from './nakladnoy/nakladnoy.component';
import { RoleComponent } from './role/role.component';
import { ColorComponent } from './color/color.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        canActivate: [AuthGuard],
        // data: { requiredRoles: ['allFunctionals', 'users'] },
        title: 'Пользователи',
        loadChildren: () =>
          import('../dashboard/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'roles',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../dashboard/role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'cities',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../dashboard/city/city.module').then((m) => m.CityModule),
      },
      {
        path: 'colors',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../dashboard/color/color.module').then((m) => m.ColorModule),
      },
      {
        path: 'blanka',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../dashboard/blanka/blanka.module').then(
            (m) => m.BlankaModule
          ),
      },
      {
        path: 'company',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../dashboard/company/company.module').then(
            (m) => m.CompanyModule
          ),
      },
      {
        path: 'store',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('../dashboard/store/store.module').then((m) => m.StoreModule),
      },
      {
        path: 'search-bco',
        title: 'Поиск по БСО',
        loadChildren: () =>
          import('../dashboard/search-bco/search-bco.module').then(
            (m) => m.SearchBcoModule
          ),
      },
      {
        path: 'seria',
        title: 'Серия',
        loadChildren: () =>
          import('../dashboard/seria/seria.module').then((m) => m.SeriaModule),
      },
      {
        path: 'vehicle',
        title: 'Транспортное средства',
        loadChildren: () =>
          import('../dashboard/vehicle/vehicle.module').then(
            (m) => m.VehicleModule
          ),
      },
      {
        path: 'issuedPassport',
        title: 'Место выдачи паспорта',
        loadChildren: () =>
          import('./issued-passport/issued-passport.module').then(
            (m) => m.IssuedPassportModule
          ),
      },
      {
        path: 'referenceAccountCarnumber',
        title: 'Справка-счет(Ракам ТЧ)',
        loadChildren: () =>
          import(
            './reference-account-carnumber/reference-account-carnumber.module'
          ).then((m) => m.ReferenceAccountCarnumberModule),
      },
      {
        path: 'referenceAccount',
        title: 'Справка-счет',
        loadChildren: () =>
          import('./reference-account/reference-account.module').then(
            (m) => m.ReferenceAccountModule
          ),
      },
      {
        path: 'nakladnoy',
        title: 'Бланка-накладной',
        loadChildren: () =>
          import('./nakladnoy/nakladnoy.module').then((m) => m.NakladnoyModule),
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent,
    ChangePasswordComponent,
    DeleteComponent,
    CompanyComponent,
    NakladnoyComponent,
    SearchBcoComponent,
    SeriaComponent,
    VehicleComponent,
    IssuedPassportComponent,
    ReferenceAccountCarnumberComponent,
    ReferenceAccountComponent,
    RoleComponent,
    ColorComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatExpansionModule,
  ],
})
export class DashboardModule {}
