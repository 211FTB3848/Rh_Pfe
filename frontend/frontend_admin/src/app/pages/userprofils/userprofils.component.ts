import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Departement } from 'src/app/_MonClasses/dep';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-userprofils',
  templateUrl: './userprofils.component.html',
  styleUrls: ['./userprofils.component.css']
})
export class UserprofilsComponent implements OnInit{
modifierAdmin(_t42: NgForm) {
throw new Error('Method not implemented.');
}
  email:any;
   currentUser: any;
  user: Utilisateur={
    id: 0,
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
    email: '',
    password: '',
    etat: false,
    cin: '',
    fonction: '',
    dateNaissance: '',
    letterMotivation: '',
    departement: new Departement,
    rolesUtilisateur: []
  };
  nomRole: string;
  constructor(private  authService:AuthService,public adminService:AdminService, private userService:UtilisateurService , private router:Router){
  

  }
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if(this.authService.isLoggedIn()){
       this.userService.getByEmail(this.currentUser).subscribe((data:Utilisateur)=>{
      console.log(data)
      this.user=data
      this.nomRole= data.rolesUtilisateur[0].nomRoles
    })
     }
  
  }

}
