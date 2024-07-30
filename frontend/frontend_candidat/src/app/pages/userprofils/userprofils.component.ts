import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidat } from 'src/app/_MonClasses/candidat';
import { Departement } from 'src/app/_MonClasses/dep';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
  import { AuthService } from 'src/app/_MonServices/auth.service';
import {  UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-userprofils',
  templateUrl: './userprofils.component.html',
  styleUrls: ['./userprofils.component.css']
})
export class UserprofilsComponent implements OnInit {
  changePassword() {
  throw new Error('Method not implemented.');
  }
  saveChanges() {
  throw new Error('Method not implemented.');
  }
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    connectedUser: any;
    id: number
    jobseeker: Candidat={
      cv: '',
      dateCreation: '',
      id: 0,
      nom: '',
      prenom: '',
      adresse: '',
      tel: '',
      cin: '',
      fonction: '',
      dateNaissance: '',
      letterMotivation: '',
      etat: false,
      email: '',
      password: '',
      departement: new Departement,
      rolesUtilisateur: []
    }
     
    info: any;
    userInfo: any;
     constructor(private utilisateurService: UtilisateurService, private userAuthService:AuthService  , 
      private userService:AdminService
      , private router: Router, private activatedRoute: ActivatedRoute) { }
    ngOnInit(): void {
     this.connectedUser= this.userAuthService.getCurrentUser()
     console.log(this.connectedUser.sub)
  this.utilisateurService.getByEmail(this.connectedUser).subscribe((data:Candidat)=>{
    console.log(data)
    this.jobseeker=data
  })
    }
    goToMyCV() {
      this.router.navigate(['/mycv'],)
    }
    goToMyProfils() {
      this.router.navigate(['/myprofils'],)
    }
    logout(){
      this.userAuthService.clear()
      this.router.navigate(['/login']).then(()=>{
        location.reload()
      })
    }
  }
  