import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Departement } from 'src/app/_MonClasses/dep';
import { Projet } from 'src/app/_MonClasses/projet';
import { TacheProjet } from 'src/app/_MonClasses/tacheProjet';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { ProjetService } from 'src/app/_MonServices/projet.service';
import { TacheProjetService } from 'src/app/_MonServices/tacheProjet.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  id: number;
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
      departement: new Departement
    },
    departement: new Departement
  };
  listtache: TacheProjet[];
  tache: TacheProjet = {
    id: 0,
    nomTache: '',
    description: '',
    employeur: new Utilisateur,
    projet: new Projet,
    nomDoc: '',
    doc: '',
    etat: false
  };
  listemp: Utilisateur[];
  doc: any;
  currentUser: any;
  utilisateur: Utilisateur;
  searchKeyword: any;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    public adminService: AdminService,
    private projetService: ProjetService,
    private tacheService: TacheProjetService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.projetService.findByIdProjet(this.id).subscribe(data => {
        this.projet = data;
      });
      this.getAll();
    });
    this.utilisateurService.getAllEmp().subscribe(data => {
      this.listemp = data;
    });
    this.currentUser = this.authService.getCurrentUser();
    this.utilisateurService.getByEmail(this.currentUser).subscribe(data => {
      this.utilisateur = data;
    });
  }

  getAll() {
    this.tacheService.getTacheByProjet(this.id).subscribe(data => {
      this.listtache = data;
    });
  }

  ajouterTache(form: NgForm) {
    const formData = new FormData();
    formData.append('doc', this.doc);
    formData.append('tache',  new Blob([JSON.stringify(this.tache)], { type: 'application/json' }));
  
    formData.append('idProjet', this.projet.id.toString());
 
    if (this.tache.id === 0) {
      this.tacheService.saveTache(formData , this.projet.id).subscribe(data => {
        this.getAll();
        form.resetForm();
      });
    } else {
      this.tacheService.updateTache(this.tache.id, formData).subscribe(data => {
        this.getAll();
        form.resetForm();
      });
    }
  }

  onFileSelected(event:any) {
    this.doc = event.target.files[0];
  }

  editTache(tache: TacheProjet) {
    this.tache = { ...tache };
  }

  deleteTache(id: number) {
    if (confirm('voulez vous supprimer cette tache?')) {
      this.tacheService.deleteTache(id).subscribe(() => {
        this.getAll();
      });
    }
  }
  
  searchTache(): TacheProjet[] {
    if (!this.searchKeyword) {
      return this.listtache;
    }

    const keyword = this.searchKeyword.toLowerCase();
    return this.listtache.filter(t =>
      t.nomTache.toLowerCase().includes(keyword) ||
      t.employeur.nom.toLowerCase().includes(keyword) ||
      t.employeur.prenom.toString().includes(keyword)  
     );
  }
}
