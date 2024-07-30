import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AuthGuard } from './_auth/auth.guard';
import { ChefDepartmentComponent } from './pages/utilisateur/chef-department/chef-department.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjetsComponent } from './pages/projets/projets.component';
import { DepartementComponent } from './pages/departement/departement.component';
import { CemplyeurComponent } from './pages/utilisateur/cemplyeur/cemplyeur.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ListTacheComponent } from './pages/list-tache/list-tache.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { FormationDetailsComponent } from './pages/formation-details/formation-details.component';
import { UserprofilsComponent } from './pages/userprofils/userprofils.component';
import { ChefProjetComponent } from './pages/utilisateur/chef-projet/chef-projet.component';
import { OublieMotdepasseComponent } from './pages/oublie-motdepasse/oublie-motdepasse.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CongeComponent } from './pages/conge/conge.component';
import { PointageComponent } from './pages/pointage/pointage.component';
import { OfferEmploi } from './_MonClasses/OfferEmploi';
import { OfferEmploiComponent } from './pages/offer-emploi/offer-emploi.component';
import { CandidatureComponent } from './pages/candidature/candidature.component';
      
   const routes: Routes = [
    { path: "", redirectTo: "", pathMatch: 'full' },
    { path: "", component: IndexComponent },
    { path: 'index', component: IndexComponent },
    { path: 'chef_appartment', component: ChefDepartmentComponent , canActivate: [AuthGuard], data: { rolesUtilisateur: ['ADMIN'] }},
    { path: 'employee', component: CemplyeurComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profils', component: UserprofilsComponent },
    { path: 'projets', component: ProjetsComponent },
    { path: 'formations', component: FormationsComponent },
    { path: 'departments', component: DepartementComponent, canActivate: [AuthGuard], data: { rolesUtilisateur: ['ADMIN'] } },
    { path: 'listTache', component: ListTacheComponent, canActivate: [AuthGuard], data: { rolesUtilisateur: ['EMPLOYEE'] } },
    { path: 'projectDetails', component: ProjectDetailsComponent },
    { path: 'formationDetails', component: FormationDetailsComponent },
    { path: 'register', component: RegisterAdminComponent },
    { path: 'chefProjet', component: ChefProjetComponent },
    { path: 'conge', component: CongeComponent },
    { path: 'offersEmploi', component: OfferEmploiComponent },
    { path: 'candidture', component: CandidatureComponent },
    { path: 'pointage', component: PointageComponent },
    { path: 'mot-de-passe-oblie', component: OublieMotdepasseComponent },
    { path: 'reinitailmotdepass', component: ResetPasswordComponent },
  ];
  
   

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
