import { Component, OnInit } from '@angular/core'; 
import { NgForm } from '@angular/forms';
import { Conge } from 'src/app/_MonClasses/conge';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { CongeService } from 'src/app/_MonServices/conge.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  conges: Conge[] = [];
  utilisateurs: Utilisateur[] = [];
  newConge: Conge = {
    id: 0,
    numberJours: 0,
    etat: false,
    reason: '',
    employeur: new Utilisateur(),
    datedebutConge: '',
    dateFinConge: '',
    pinding: false
  };
  employeur: Utilisateur = new Utilisateur();
  currentUser: any;
  utilisateur: Utilisateur;

  constructor(
    private congeService: CongeService, 
    private userService: UtilisateurService,
    private authService: AuthService, 
    public adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.authService.isLoggedIn()) {
      this.userService.getByEmail(this.currentUser).subscribe((data: Utilisateur) => {
        this.utilisateur = data;
        this.newConge.employeur = this.utilisateur; // Set the employeur to the connected user
        this.loadConges();
      });
    }
  }

  loadConges(): void {
    if (this.adminService.rolesMatch(['ADMIN'])) {
      this.congeService.findAllForAdmin().subscribe((data: Conge[]) => {
        this.conges = data;
      });
    } else if (this.adminService.rolesMatch(['CHEF DAPRATEMENT'])) {
      this.congeService.findByDepartement(this.utilisateur.departement.id).subscribe((data: Conge[]) => {
        this.conges = data;
      });
    } else {
      this.congeService.findByEmployeur(this.utilisateur.id).subscribe((data: Conge[]) => {
        this.conges = data;
      });
    }
  }

  getConges(): void {
    this.congeService.listConges().subscribe((data: Conge[]) => {
      this.conges = data;
    });
  }

  addConge(form: NgForm): void {
    this.congeService.demandeConge(this.newConge, this.utilisateur.id).subscribe((data: Conge) => {
      this.conges.push(data);
      form.resetForm();
      this.newConge = new Conge(); // Reset the newConge object
      this.newConge.employeur = this.utilisateur; // Reset the employeur to the connected user
    });
  }

  editConge(conge: Conge): void {
    // Implement edit functionality
  }

  calculateDays(): void {
    if (this.newConge.datedebutConge && this.newConge.dateFinConge) {
      const start = new Date(this.newConge.datedebutConge);
      const end = new Date(this.newConge.dateFinConge);
      const timeDiff = end.getTime() - start.getTime();
      this.newConge.numberJours = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Add 1 to include the end date
    }
  }

  acceptConge(id: number): void {
    this.congeService.acceptConge(id).subscribe((data: Conge) => {
      this.getConges(); // Refresh the list after accepting
      alert('Conge Accepte!');
    });
  }

  refuseConge(id: number): void {
    this.congeService.refuseConge(id).subscribe((data: Conge) => {
      this.getConges(); // Refresh the list after refusing
      alert('Conge refused !');
    });
  }
}
