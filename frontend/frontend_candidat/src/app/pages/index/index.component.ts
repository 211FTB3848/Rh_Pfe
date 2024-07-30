import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { DepartementService } from 'src/app/_MonServices/dep.service';
 import { Departement } from 'src/app/_MonClasses/dep';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';
import { ProjetService } from 'src/app/_MonServices/projet.service';
import { Projet } from 'src/app/_MonClasses/projet';
import { OfferEmploiService } from 'src/app/_MonServices/OfferEmploi.service';
import { OfferEmploi } from 'src/app/_MonClasses/OfferEmploi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  listoffer: OfferEmploi[];
  nbrOffer: number;
 
  departements: Departement[];
 

  constructor(
    private router:Router,
    private adminService: AdminService,
    private utilisateurService: UtilisateurService,
    private departementService: DepartementService,
    private offerService:OfferEmploiService
  ) { }

  ngOnInit(): void {
     this.loadDepartements();
     this.loadOffers()
   }
   loadOffers() {
    this.offerService.getAllOffer().subscribe((data: OfferEmploi[]) => {
      this.listoffer = data;
      this.nbrOffer=data.length

    });
  }
 

  findByIdJob(id: number) {
    this.router.navigate(['/jobDetails', { id }])
  }
  goToCvDetails(id: number) {
    this.router.navigate(['cvDetails',{id}])
  }
  findByCatJob(id: number) {
    this.router.navigate(['/lisOfferByCat', { id }])
  }
 

  loadDepartements() {
    this.departementService.getAllDep().subscribe((data: Departement[]) => {
      this.departements = data;
     });
  }

   
}
