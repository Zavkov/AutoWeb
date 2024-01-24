
import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './shared/interceptor/interceptor';
import { MatIconRegistry } from '@angular/material/icon';
import { loadSvgResources } from './shared/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxSpinnerModule,
    LoginModule,
    DashboardModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    loadSvgResources(this.matIconRegistry, this.domSanitizer);
  }
}
