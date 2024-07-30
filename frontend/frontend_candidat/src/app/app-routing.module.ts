import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AuthGuard } from './_auth/auth.guard';
 import { LoginComponent } from './pages/login/login.component';
     import { UserprofilsComponent } from './pages/userprofils/userprofils.component';
import { RegisterComponent } from './pages/register/register.component';
import { OfferdetailsComponent } from './pages/offerdetails/offerdetails.component';
import { ListofferComponent } from './pages/listoffer/listoffer.component';
import { CandidaturesComponent } from './pages/candidatures/candidatures.component';
      
   const routes: Routes = [
    { path: "", redirectTo: "", pathMatch: 'full' },
    { path: "", component: IndexComponent },
    { path: 'index', component: IndexComponent }, 
    { path: 'login', component: LoginComponent },
    { path: 'profils', component: UserprofilsComponent },
    {path:"jobDetails" , component:OfferdetailsComponent},
    {path:"lisOfferByCat" , component:ListofferComponent},
    { path: 'register', component: RegisterComponent },
    {path:"mycandidature" , component:CandidaturesComponent},

  ];
  
   

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
