import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidature } from 'src/app/_MonClasses/Candidature';
import { Departement } from 'src/app/_MonClasses/dep';
import { OfferEmploi } from 'src/app/_MonClasses/OfferEmploi';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { OfferEmploiService } from 'src/app/_MonServices/OfferEmploi.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';
import { Candidat } from 'src/app/_MonClasses/candidat';
import { CandidatureService } from 'src/app/_MonServices/candidature.service';

@Component({
  selector: 'app-offerdetails',
  templateUrl: './offerdetails.component.html',
  styleUrls: ['./offerdetails.component.css']
})
export class OfferdetailsComponent implements OnInit {

  id: number;
  offer: OfferEmploi = {
    id: 0,
    titre: '',
    resumePoste: '',
    typeOfferEmploi: '',
    location: '',
    salMax: 0,
    salMin: 0,
    dateCreation: '',
    dateExpiraton: '',
    etat: false,
    enattent: false,
    departement: new Departement()
  };
  listOfferByCat: OfferEmploi[];
 
  currentUser: any;
  cv: string | Blob;
  candidature: Candidature = {
    id: 0,
    lettreMotivation: '',
    offerEmploi: new OfferEmploi(),
    acepted: false,
    cv: '',
    refused: false,
    pinding: true,
    dateCandidture: '',
    candidat: new Candidat()
  };
  utilisateur: Candidat = {
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
    departement: new Departement(),
    rolesUtilisateur: []
  };

  constructor(
    private activRoute: ActivatedRoute,
    private router: Router,
    private jobSeekerService: UtilisateurService,
    private userAuthService: AuthService,
    private offerService: OfferEmploiService,
    private candidatureService: CandidatureService,
   ) { }

  ngOnInit(): void {
    this.activRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.offerService.getOfferByID(this.id).subscribe((data: OfferEmploi) => {
        this.offer = data;
        this.offerService.getOfferByDep(data.departement.id).subscribe((data: OfferEmploi[]) => {
          this.listOfferByCat = data;
        });
      });
    });

    this.currentUser = this.userAuthService.getCurrentUser();
    this.jobSeekerService.getByEmail(this.currentUser).subscribe((data: Candidat) => {
      this.utilisateur = data;
      this.candidature.candidat = data;
    });
  }

  gotoJob(id: number) {
    this.router.navigate(['/jobDetails', { id }]);
  }

  sendCandidat(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('cv', this.cv);
      formData.append('candidature', new Blob([JSON.stringify(this.candidature)], { type: 'application/json' }));
      this.candidatureService.saveCandidature(formData, this.utilisateur.id, this.offer.id).subscribe(
        (data: Candidature) => {
          alert('Votre candidature a été envoyée avec succès!');
          this.router.navigate(['/jobDetails', { id: this.offer.id }]).then(() => {
            location.reload();
          });
        },
        (error) => {
         alert('Une erreur s\'est produite lors de l\'envoi de votre candidature.');
        }
      );
    }
  }

  public loginOrNot() {
    return this.userAuthService.isLoggedIn();
  }

  onFileSelected(event: any) {
    this.cv = event.target.files[0];
    console.log(event.target.files[0]);
  }
}
