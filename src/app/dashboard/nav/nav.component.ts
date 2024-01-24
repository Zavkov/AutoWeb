import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AccessControlService } from 'src/app/shared/services/access-control.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  userName: string = '';

  constructor(
    private router: Router,
    private auth: AuthService,
    public accessControlService: AccessControlService,
    private dialog: MatDialog
  ) {
    this.accessControlService
      .getUserInfo()
      .pipe(map((userInfo) => userInfo?.firstName || ''))
      .subscribe((username) => {
        this.userName = username;
      });
  }
  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }

  logout() {
    this.auth.logout();
  }
}
