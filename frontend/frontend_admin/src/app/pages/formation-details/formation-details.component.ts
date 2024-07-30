import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ChefAppartement } from 'src/app/_MonClasses/chefdappartement';
import { Departement } from 'src/app/_MonClasses/dep';
import { Formation } from 'src/app/_MonClasses/Formation';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { FormationService } from 'src/app/_MonServices/formation.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.css']
})
export class FormationDetailsComponent implements OnInit {
  id: number;
  formation: Formation={
    id: 0,
    description: '',
    titre: '',
    datedebut: '',
    datefin: '',
    categorieFormation: '',
    departement: new Departement,
    members: [],
    formateur: new Utilisateur
  };
  selectedMembers: number[] = [];
  currentUser: any;
  utilisateur: ChefAppartement;
  listemp: Utilisateur[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    public adminService: AdminService,
    private formationService: FormationService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = +params['id'];  
      this.formationService.findByIdFormation(this.id).subscribe((data: Formation) => {
        this.formation = data;
        console.log(data);
      });
    });

    this.currentUser = this.authService.getCurrentUser();
    this.utilisateurService.getByEmail(this.currentUser).subscribe((data: any) => {
      console.log(data);
      this.utilisateur = data;
      if (this.adminService.rolesMatch(['CHEF DAPRATEMENT'])) {
        this.utilisateurService.byDepEmployee(this.utilisateur.departement.id).subscribe((data: Utilisateur[]) => {
          this.listemp = data;
          console.log(data)
        });
      }
    });
  }

  ajouterFormateur(form: NgForm) {
    this.formationService.ajouterFormateur(this.formation).subscribe((data: Formation) => {
      this.formation = data;
    });
  }

  ajouterMembres(form: NgForm) {
    const addMembersObservable = this.selectedMembers.map(memberId =>
      this.formationService.ajouterMembres(this.formation.id, memberId)
    );
    
    forkJoin(addMembersObservable).subscribe((updatedFormationArray: Formation[]) => {
      this.formation = updatedFormationArray[updatedFormationArray.length - 1];
    });
  }
}
