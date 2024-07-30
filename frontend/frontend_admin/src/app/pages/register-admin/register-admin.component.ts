import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { Departement } from 'src/app/_MonClasses/dep';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit{

  admin: Utilisateur = {
    id: 0,
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
    cin: '',
    email: '',
    password: '',
    etat: true,
    dateNaissance: '',
    fonction: '',
    letterMotivation: '',
    rolesUtilisateur: [],
    departement: new Departement()
  };
  image: any;
  doctormail: any;
  
  constructor(private utilisateurService: AdminService, 
              private authService: AuthService,
              private router: Router, 
              private activeRoute: ActivatedRoute) {}  
  
  ngOnInit(): void {}
  
  inscriptionAdmin(form: NgForm) {
    console.log(form.value);
    this.utilisateurService.inscriptionAdmin(this.admin).subscribe((data: Utilisateur) => {
      console.log(data);
      if (data != null) {
        alert("Inscription avec succès");
        this.router.navigate(['/login']);
      } else {
        alert("Un compte SUPER ADMIN existe déjà");
        this.router.navigate(['/login']);
      }
    });
  }
}
