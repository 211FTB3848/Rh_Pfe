import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/_MonClasses/candidat';
import { Candidature } from 'src/app/_MonClasses/Candidature';
import { Departement } from 'src/app/_MonClasses/dep';
import { Formation } from 'src/app/_MonClasses/Formation';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { CandidatureService } from 'src/app/_MonServices/candidature.service';
  import { FormationService } from 'src/app/_MonServices/formation.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-candidatures',
  templateUrl: './candidatures.component.html',
  styleUrls: ['./candidatures.component.css']
})
export class CandidaturesComponent implements OnInit {

  currentUser: any;
  jobseeker: Candidat = {
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
  };
   
  listCandidture: Candidature[];

  constructor(
    private jobSeekerService: UtilisateurService,
    private router: Router,
     private userAuthService: AuthService,
    private candidatureService: CandidatureService
  ) { }

  ngOnInit(): void {
    if (this.userAuthService.isLoggedIn()) {
      this.currentUser = this.userAuthService.getCurrentUser();
      this.jobSeekerService.getByEmail(this.currentUser).subscribe((data: Candidat) => {
        this.jobseeker = data;
        this.candidatureService.byCandidat(data.id).subscribe((data:Candidature[])=>{
          console.log(data)
          this.listCandidture=data
        })
       
      });
    }
  }

 
  goToMyProfils() {
    this.router.navigate(['/myprofils']);
  }

  logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']).then(() => {
      location.reload();
    });
  }
  delete(id: number) {
    if(confirm("voulez vous supprimer cette candidture")){
      this.candidatureService.delete(id).subscribe((data:Candidature)=>{
        alert("votre candtureida a ete supprimer ")
        this.router.navigate(['/mycandidature']).then(()=>{
          location.reload()
        })
      })
    }
  }
}
