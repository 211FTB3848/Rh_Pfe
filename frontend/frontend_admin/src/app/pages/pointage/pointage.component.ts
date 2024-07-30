import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pointage } from 'src/app/_MonClasses/pointage';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { PointageService } from 'src/app/_MonServices/pointage.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {
  pointage: Pointage = {
    id: 0,
    employeur: new Utilisateur(),
    dateJours: '',
    datedebut: '',
    dateFin: ''
  };
  pointages: Pointage[] = [];
  currentUser: any;
  utilisateur: Utilisateur;

  constructor(
    private pointageService: PointageService,
    private authService: AuthService,
    private router:Router,
    private adminService:AdminService,
    private userService: UtilisateurService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.authService.isLoggedIn()) {
      this.userService.getByEmail(this.currentUser).subscribe((data: Utilisateur) => {
        this.utilisateur = data;
        this.loadPointages();
      });
    }
  }

  marquerPresence() {
    this.pointage.employeur = this.utilisateur; // Assign the current user as the employeur
    this.pointageService.marquerPresence(this.utilisateur.id, this.pointage).subscribe(() => {
      alert("vore presence a ete ajouter ")
      this.router.navigate(['/pointage']).then(()=>{
        location.reload()
      })
    });
  }

  loadPointages() {
    if(this.adminService.rolesMatch(['ADMIN'])){
      this.pointageService.getAllPointages().subscribe(data => {
        this.pointages = data;
  console.log(data)    })
    }else{
   this.pointageService.getPointagesByUser(this.utilisateur.id).subscribe(data => {
      this.pointages = data;
console.log(data)  
  });   
    }
    
  }
}
