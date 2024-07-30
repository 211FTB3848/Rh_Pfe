import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/_MonClasses/dep';
import { OfferEmploi } from 'src/app/_MonClasses/OfferEmploi';
import { DepartementService } from 'src/app/_MonServices/dep.service';
import { OfferEmploiService } from 'src/app/_MonServices/OfferEmploi.service';

@Component({
  selector: 'app-listoffer',
  templateUrl: './listoffer.component.html',
  styleUrls: ['./listoffer.component.css']
})
export class ListofferComponent implements OnInit {

  id: number;
  searchKeyword: string = '';
  listOfferByCat: OfferEmploi[] = [];
  listcat: any[]; // Assuming this is populated with categories

  constructor(private activRoute: ActivatedRoute,private depService:DepartementService, private router: Router, private offerService: OfferEmploiService) { }

  ngOnInit(): void {
    this.activRoute.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.getOffersByCategory(this.id);
      } else {
        this.getAllOffers();
      }
    });
    this.depService.getAllDep().subscribe((data: Departement[]) => {
      this.listcat = data;
    });
  }

  getAllOffers() {
    this.offerService.getAllOffer().subscribe((data: OfferEmploi[]) => {
      this.listOfferByCat = data;
    });
  }

  getOffersByCategory(id: number) {
    this.offerService.getOfferByDep(id).subscribe((data: OfferEmploi[]) => {
      this.listOfferByCat = data;
    });
  }

  findByCatJob(id: number) {
    this.router.navigate(['/lisOfferByCat', { id }]);
  }

  findByIdJob(id: number) {
    this.router.navigate(['/jobDetails', { id }]);
  }

  searchJobs(): OfferEmploi[] {
    if (!this.searchKeyword) {
      return this.listOfferByCat;
    }

    const keyword = this.searchKeyword.toLowerCase();
    return this.listOfferByCat.filter(offer =>
      offer.titre.toLowerCase().includes(keyword) ||
      offer.resumePoste.toLowerCase().includes(keyword) ||
      offer.salMax.toString().includes(keyword) ||
      offer.salMin.toString().includes(keyword) ||
      offer.dateCreation.toLowerCase().includes(keyword) ||
      offer.dateExpiraton.toLowerCase().includes(keyword) ||
      offer.typeOfferEmploi.toLowerCase().includes(keyword) ||
      offer.location.toLowerCase().includes(keyword) ||
        offer.departement.nomDep.toLowerCase().includes(keyword)
    );
  }
}
