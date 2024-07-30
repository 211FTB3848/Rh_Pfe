import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './_MonServices/auth.service';
import { AuthInterceptor } from './_auth/auth.intercepter';
import { UserprofilsComponent } from './pages/userprofils/userprofils.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { AuthGuard } from './_auth/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { ListofferComponent } from './pages/listoffer/listoffer.component';
import { OfferdetailsComponent } from './pages/offerdetails/offerdetails.component';
import { CandidaturesComponent } from './pages/candidatures/candidatures.component';
 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    LoginComponent,
    UserprofilsComponent,
        RegisterComponent,
        ListofferComponent,
        OfferdetailsComponent,
        CandidaturesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatIconModule,
    MatButtonModule, MatRadioModule, FormsModule
    , HttpClientModule, BrowserAnimationsModule
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true

  },
    AuthService],

  bootstrap: [AppComponent]
})
export class AppModule { }
