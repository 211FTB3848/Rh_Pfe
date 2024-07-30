import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; 
import { Candidat } from 'src/app/_MonClasses/candidat';
import { Departement } from 'src/app/_MonClasses/dep';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  jobseeker: Candidat = {
    dateNaissance: '',
    id: 0,
    nom: '',
    prenom: '',
    adresse: '',
    email: '',
    password: '',
    etat: true,
    cv: '',
    dateCreation: '',
    tel: '',
    cin: '',
    fonction: '',
    letterMotivation: '',
    departement: new Departement,
    rolesUtilisateur: []
  };
 
  constructor(private utilisateurService: UtilisateurService, private router: Router) { }

  ngOnInit(): void {}

  addNewJobSeeker(form: NgForm) {
  
 
    this.utilisateurService.saveJobSeeker(this.jobseeker).subscribe((data: Candidat) => {
      console.log(data);
      if (data !== null) {
        window.alert("Votre Compte A ete Cree avec success");
        this.router.navigate(['/login']);
      } else {
        window.alert("Email exist deja !!");
      }
    });
  }

 
 
}
