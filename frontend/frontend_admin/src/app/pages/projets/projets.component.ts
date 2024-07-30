import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChefProjet } from 'src/app/_MonClasses/chefprojet';
import { Departement } from 'src/app/_MonClasses/dep';
import { Projet } from 'src/app/_MonClasses/projet';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { ProjetService } from 'src/app/_MonServices/projet.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  utilisateurs: Utilisateur[];
  utilisateur: Utilisateur;
  role: string;
  listProjetbyEmp: Projet[];
  listProjetChef: Projet[];
  listProjetChefProjet: Projet[];
  listProjet: Projet[];
  filteredProjets: Projet[];
  projet: Projet = {
    id: 0,
    description: '',
    titre: '',
    datedebut: '',
    datefin: '',
    dateCreation: '',
    chefProjet: {
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
      departement: new Departement()
    },
    departement: {
      id: 0,
      nomDep: '',
      description: ''
    }
  };
  currentUser: any;
  searchTerm: string = '';

  constructor(private projetService: ProjetService,
              private authService: AuthService,
              public adminService: AdminService,
              private router: Router,
              private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.authService.isLoggedIn()) {
      this.utilisateurService.getByEmail(this.currentUser).subscribe((data: Utilisateur) => {
        this.utilisateur = data;
        if (this.adminService.rolesMatch(['CHEF DAPRATEMENT']) || this.adminService.rolesMatch(['CHEF PROJET']) ) {
          this.utilisateurService.byDepChefProjet(this.utilisateur.departement.id).subscribe((data: ChefProjet[]) => {
            this.utilisateurs = data;
        }  )
          this.projetService.findByDep(this.utilisateur.departement.id).subscribe((data: Projet[]) => {
            this.listProjet = data;
            this.filteredProjets = data;
          });
        } else if (this.adminService.rolesMatch(['ADMIN'])) {
          this.projetService.getAllProjet().subscribe((data: Projet[]) => {
            this.listProjet = data;
            this.filteredProjets = data;
          });
        }
      });
    }
  }

  goToProjectDetails(id: number) {
    this.router.navigate(['/projectDetails', { id }]);
  }

  ajouterProjet(form: NgForm) {
    this.projetService.addNewProjet(this.projet).subscribe((data: Projet) => {
      alert("Le projet a été ajouté avec succès");
      this.router.navigate(['/projets']).then(() => {
        location.reload();
      });
    });
  }

  updateProjet(form: NgForm) {
    this.projetService.updateProjet(this.projet).subscribe((data: Projet) => {
      alert("Le projet a été mis à jour avec succès");
      this.router.navigate(['/projets']).then(() => {
        location.reload();
      });
    });
  }

  editProjet(projet: Projet) {
    this.projet = { ...projet };
  }

  deleteProjet(id: number) {
    if (confirm("Voulez-vous vraiment supprimer ce projet?")) {
      this.projetService.deleteProjet(id).subscribe(() => {
        alert("Le projet a été supprimé avec succès");
        this.router.navigate(['/projets']).then(() => {
          location.reload();
        });
      });
    }
  }
  searchPrj(): Projet[] {
    if (!this.searchTerm) {
      return this.listProjet;
    }

    const keyword = this.searchTerm.toLowerCase();
    return this.listProjet.filter(t =>
      t.titre.toLowerCase().includes(keyword) ||
      t.chefProjet.nom.toLowerCase().includes(keyword) ||
      t.chefProjet.prenom.toString().includes(keyword)  ||
      t.chefProjet.email.toString().includes(keyword)  
      );
  }
  filterProjects() : Projet[]{   
    return this.listProjet.filter(projet =>
      (!this.searchTerm || projet.titre.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.searchTerm || projet.chefProjet.nom.includes(this.searchTerm.toLowerCase())) &&
      (!this.searchTerm || projet.departement.nomDep.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
}
