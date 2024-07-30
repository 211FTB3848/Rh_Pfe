import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChefProjet } from 'src/app/_MonClasses/chefprojet';
import { Departement } from 'src/app/_MonClasses/dep';
import { Employee } from 'src/app/_MonClasses/employee';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { DepartementService } from 'src/app/_MonServices/dep.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-chef-projet',
  templateUrl: './chef-projet.component.html',
  styleUrls: ['./chef-projet.component.css']
})
export class ChefProjetComponent implements OnInit {

  user: ChefProjet = {
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
  searchNom: string = '';
  searchCIN: string = '';
  searchEmail: string = '';
  listemp: Employee[];
  departements: Departement[];
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
    departement: {
      id: 0,
      nomDep: '',
      description: ''
    }
  };
  listChefProjet: ChefProjet[];

  constructor(private utilisateurService: UtilisateurService, public userService: AdminService,
    private authService: AuthService, private depService: DepartementService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.authService.isLoggedIn()) {
      this.utilisateurService.getByEmail(this.currentUser).subscribe((data: Utilisateur) => {
        console.log(data)
        this.utilisateur = data
        if(this.userService.rolesMatch(['CHEF DAPRATEMENT'])){
          this.utilisateurService.byDepChefProjet(this.utilisateur.departement.id).subscribe((data: Employee[]) => {
            console.log(this.utilisateur.departement.id)
            console.log(data)
            this.listChefProjet = data
          })
        }
      })
      if(this.userService.rolesMatch(['ADMIN'])){
        this.utilisateurService.getAllChefProjet().subscribe((data: ChefProjet[]) => {
          console.log(data)
          this.listChefProjet = data
        })
      } 
      this.depService.getAllDep().subscribe((data: Departement[]) => {
        this.departements = data
      })
    }
  }
  isDateValid(date: string): boolean {
    return new Date(date) <= new Date(this.today);
  }
  ajouterChefProjet(form: NgForm) {
    console.log(form.value)
    if (form.valid) {

    const formData = new FormData();
    formData.append('chefprj', new Blob([JSON.stringify(this.user)], { type: 'application/json' }));
    formData.append('id', this.utilisateur.departement.id.toString());

    this.utilisateurService.saveChefPrj(formData).subscribe((data: ChefProjet) => {
      if (data != null) {
        alert("Chef de projet  ajouté avec succès");
        this.router.navigate(['/chefProjet']).then(() => {
          location.reload();
        });
      } else {
        alert("Vérifiez les informations de l'employeur");
      }
    });
  }
}

  updateChefProjet(form: NgForm) {
    if (!this.isDateValid(this.user.dateNaissance) ) {
      window.alert('La date de naissance et la date d\'embauche doivent être inférieures à la date actuelle.');
      return;
    }
    if (form.valid) {

    this.utilisateurService.updateChefProjet(this.user.id, this.user).subscribe((data: Employee) => {
      if (data != null) {
        alert("compte chef de Projet mis à jour avec succès");
        this.router.navigate(['/chefProjet']).then(() => {
          location.reload();
        });
      } else {
        alert("Vérifiez les informations de chef projet ");
      }
    });
  }
  }

  update(id: number) {
    this.utilisateurService.getEmployeeById(id).subscribe((data:Employee)=>{
      this.user=data
    })
    }
    
    active(id: number) {
      this.utilisateurService.activer(id).subscribe((data: Utilisateur) => {
        if (!data.etat) {
          alert("Compte chef de projet a ete  desactive");
          this.router.navigate(['/chefProjet']).then(() => {
            location.reload();
          });
        } else {
          alert("Compte chef de projet a ete active");
          this.router.navigate(['/chefProjet']).then(() => {
            location.reload();
          });
        }
      });
    }
  reset(form: NgForm) {
    this.router.navigate(['/chefProjet']).then(()=>{
      location.reload()
    })
    }
    filteredListemp(): ChefProjet[] {
      return this.listChefProjet.filter(emp =>
        (!this.searchNom || emp.nom.toLowerCase().includes(this.searchNom.toLowerCase())) &&
        (!this.searchCIN || emp.cin.includes(this.searchCIN)) &&
        (!this.searchEmail || emp.email.toLowerCase().includes(this.searchEmail.toLowerCase()))
      );
    }
}
