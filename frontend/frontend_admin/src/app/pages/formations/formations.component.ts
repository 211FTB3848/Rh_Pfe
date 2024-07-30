import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Formation } from 'src/app/_MonClasses/Formation';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { Departement } from 'src/app/_MonClasses/dep';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { FormationService } from 'src/app/_MonServices/formation.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.css']
})
export class FormationsComponent implements OnInit {


  formations: Formation[] = [];
  utilisateurs: Utilisateur[] = [];
  selectedUtilisateurs: Utilisateur[] = [];
  newFormation: Formation = {
    id: 0,
    description: '',
    titre: '',
    datedebut: '',
    datefin: '',
    categorieFormation: '',
    formateur: new Utilisateur(),
    departement: new Departement(),
    members: []
  };
  currentUser: any;
  utilisateur: Utilisateur = {
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
    rolesUtilisateur: [],
    departement: new Departement
  };

  constructor(
    private router: Router,
    public adminService: AdminService,
    private authService: AuthService,
    private formationService: FormationService,
    private utilisateurService: UtilisateurService,
    private userService: AdminService
  ) { }


  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

   
   
    if (this.userService.rolesMatch(['CHEF DAPRATEMENT']) || this.userService.rolesMatch(['EMPLOYEE'])) {
 this.utilisateurService.getByEmail(this.currentUser).subscribe((data: Utilisateur) => {
      console.log(data)
      this.utilisateur = data
      this.utilisateurService.byDepChefProjet(this.utilisateur.departement.id)
        .subscribe((data: Utilisateur[]) => {
          console.log(data)
          this.utilisateurs = data


      this.formationService.getAllFormationByDep(this.utilisateur.departement.id).subscribe((data: Formation[]) => {
        this.formations = data
        console.log(data)
      })
    })
  })



    }
    else if (this.userService.rolesMatch(['ADMIN'])) {

      this.formationService.getAllFormation().subscribe(data => {
        this.formations = data;
      });
    }

  }

  goToformationDetails(id: number) {
    this.router.navigate(['/formationDetails', { id }])
  }



  createFormation(form: NgForm): void {
    this.formationService.ajouterFormation(this.newFormation, this.utilisateur.departement.id).subscribe((response: Formation) => {

      if(response){
        alert("votre formation a ete ajouter avec succes")
        this.router.navigate(['/formations']).then(()=>{
          location.reload()
        })
      }
    });
  }


}
