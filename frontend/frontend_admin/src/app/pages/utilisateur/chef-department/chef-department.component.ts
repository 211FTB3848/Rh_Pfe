import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChefAppartement } from 'src/app/_MonClasses/chefdappartement';
import { Departement } from 'src/app/_MonClasses/dep';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { DepartementService } from 'src/app/_MonServices/dep.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-chef-department',
  templateUrl: './chef-department.component.html',
  styleUrls: ['./chef-department.component.css']
})
export class ChefDepartmentComponent implements OnInit {
  listChefDepartment: ChefAppartement[] = [];
  departements: Departement[] = [];
  user: ChefAppartement = {
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
    departement: {
      id: 0,
      nomDep: '',
      description: ''
    },
    dateEmbauche: '',
    dateCreation: ''
  };
  today: string = new Date().toISOString().split('T')[0];
  searchName: string = '';
  searchEmail: string = '';
  searchCin: string = '';
  searchDep: string = '';

  constructor(
    private utilisateurService: UtilisateurService,
    public userService: AdminService,
    private router: Router,
    private departementService: DepartementService
  ) { }

  ngOnInit(): void {
    this.loadChefDepartments();
    this.loadDepartements();
  }

  loadChefDepartments() {
    this.utilisateurService.getAllChefDepartment().subscribe(data => {
      this.listChefDepartment = data;
    });
  }

  loadDepartements() {
    this.departementService.getAllDep().subscribe(data => {
      this.departements = data;
    });
  }

  isDateValid(date: string): boolean {
    return new Date(date) <= new Date(this.today);
  }

  reset(form: NgForm) {
    this.router.navigate(['/chef_appartment']).then(() => {
      location.reload();
    });
  }

  ajouterChefDep(form: NgForm) {
    if (!this.isDateValid(this.user.dateNaissance) ) {
      window.alert('La date de naissance et la date d\'embauche doivent être inférieures à la date actuelle.');
      return;
    }
    if (form.valid) {
      this.utilisateurService.saveChefDep(this.user).subscribe((data: Utilisateur) => {
        if (data != null) {
          alert("chef d'appartement ajouté avec succès");
          this.router.navigate(['/chef_appartment']).then(() => {
            location.reload();
          });
        } else {
          alert("Vérifiez les informations du chef d'appartement");
        }
      });
    }
  }

  update(id: number) {
    this.utilisateurService.getChefById(id).subscribe(data => {
      this.user = data;
    });
  }

  updateChef(form: NgForm) {
    if (!this.isDateValid(this.user.dateNaissance) ) {
      window.alert('La date de naissance et la date d\'embauche doivent être inférieures à la date actuelle.');
      return;
    }
    this.utilisateurService.updateChefAppartment(this.user.id, this.user).subscribe((data: Utilisateur) => {
      if (data != null) {
        alert("chef d'appartement mis à jour avec succès");
        this.router.navigate(['/chef_appartment']).then(() => {
          location.reload();
        });
      } else {
        alert("Vérifiez les informations de l'employeur");
      }
    });
  }

  active(id: number) {
    this.utilisateurService.activer(id).subscribe((data: Utilisateur) => {
      if (!data.etat) {
        alert("Compte chef d'appartement a ete  desactive");
        this.router.navigate(['/chef_appartment']).then(() => {
          location.reload();
        });
      } else {
        alert("Compte chef d'appartement a ete active");
        this.router.navigate(['/chef_appartment']).then(() => {
          location.reload();
        });
      }
    });
  }

  filteredChefs(): ChefAppartement[] {
    return this.listChefDepartment.filter(chef => 
      (!this.searchName || chef.nom.toLowerCase().includes(this.searchName.toLowerCase())) &&
      (!this.searchEmail || chef.email.toLowerCase().includes(this.searchEmail.toLowerCase())) &&
      (!this.searchCin || chef.cin.toLowerCase().includes(this.searchCin.toLowerCase())) &&
      (!this.searchDep || chef.departement.nomDep.toLowerCase().includes(this.searchDep.toLowerCase()))
    );
  }
}
