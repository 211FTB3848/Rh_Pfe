import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Departement } from 'src/app/_MonClasses/dep';
import { OfferEmploi } from 'src/app/_MonClasses/OfferEmploi';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { OfferEmploiService } from 'src/app/_MonServices/OfferEmploi.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-offer-emploi',
  templateUrl: './offer-emploi.component.html',
  styleUrls: ['./offer-emploi.component.css']
})
export class OfferEmploiComponent implements OnInit {
  offerEmploi: OfferEmploi = {
    id: 0,
    titre: '',
    resumePoste: '',
    salMax: 0,
    salMin: 0,
    dateCreation: new Date(),
    dateExpiraton: new Date(),
    typeOfferEmploi: '',
    location: '',
    etat: false,
    enattent: false,
    departement: new Departement
  };

  listoffer: OfferEmploi[];
  currentUser: any;
  utilisateur: Utilisateur;

  constructor(private offerService: OfferEmploiService,
    private authService:AuthService , private userService:UtilisateurService,
    public adminService:AdminService, private router: Router) { }

  ngOnInit(): void {
  
   
    this.loadOffers();
  }

  loadOffers() {
    this.offerService.getAllOffer().subscribe((data: OfferEmploi[]) => {
      this.listoffer = data;
    });
  }

  findById(id: number) {
    this.offerService.getOfferByID(id).subscribe((data: OfferEmploi) => {
      this.offerEmploi = data;
      // Populate form or modal with offerEmploi details
    });
  }

  saveOffer() {
    this.currentUser = this.authService.getCurrentUser();
    if(this.authService.isLoggedIn()){
       this.userService.getByEmail(this.currentUser).subscribe((data:Utilisateur)=>{
      console.log(data)
      this.utilisateur=data
      
    if (this.offerEmploi.id === 0) {
      this.offerService.saveOffer(this.offerEmploi,this.utilisateur.departement.id).subscribe((data: OfferEmploi) => {
       alert("Offre d'emploi ajoutée avec succès !");
       this.loadOffers();
     });
   } else {
      this.offerService.updateOffer(this.offerEmploi.id, this.offerEmploi).subscribe((data: OfferEmploi) => {
       alert("Offre d'emploi mise à jour avec succès !");
       this.loadOffers();
     });
   }
     })
console.log(this.currentUser)
  
  }
  }

  deleteOffer(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      this.offerService.deleteOffer(id).subscribe(() => {
        alert("Offre d'emploi supprimée avec succès !");
        this.loadOffers();
      });
    }
  }

 
 
}
