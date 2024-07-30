import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
import { ProjetsComponent } from './pages/projets/projets.component';
import { DepartementComponent } from './pages/departement/departement.component';
import { ChefDepartmentComponent } from './pages/utilisateur/chef-department/chef-department.component';
import { CemplyeurComponent } from './pages/utilisateur/cemplyeur/cemplyeur.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ListTacheComponent } from './pages/list-tache/list-tache.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { FormationDetailsComponent } from './pages/formation-details/formation-details.component';
import { DemandecongeComponent } from './pages/demandeconge/demandeconge.component';
import { ChefProjetComponent } from './pages/utilisateur/chef-projet/chef-projet.component';
import { OublieMotdepasseComponent } from './pages/oublie-motdepasse/oublie-motdepasse.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CongeComponent } from './pages/conge/conge.component';
import { PointageComponent } from './pages/pointage/pointage.component';
import { OfferEmploiComponent } from './pages/offer-emploi/offer-emploi.component';
import { CandidatureComponent } from './pages/candidature/candidature.component';
 
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    LoginComponent,
    UserprofilsComponent,
    DepartementComponent,

    ProjetsComponent,
    ChefDepartmentComponent,
    CemplyeurComponent,
    ProjectDetailsComponent,
    ListTacheComponent,
    FormationsComponent,
    RegisterAdminComponent,
    FormationDetailsComponent,
    DemandecongeComponent,
    ChefProjetComponent,
    OublieMotdepasseComponent,
    ResetPasswordComponent,
    CongeComponent,
    PointageComponent,
    OfferEmploiComponent,
    CandidatureComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatIconModule,
    MatButtonModule, MatRadioModule, FormsModule
    , HttpClientModule, BrowserAnimationsModule,MatSnackBarModule
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
