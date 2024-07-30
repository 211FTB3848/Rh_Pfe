import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TacheProjet } from 'src/app/_MonClasses/tacheProjet';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
 import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { TacheProjetService } from 'src/app/_MonServices/tacheProjet.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-list-tache',
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.css']
})
export class ListTacheComponent  implements OnInit{
  currentUser: any;
  utilisateur: Utilisateur= new Utilisateur();
  listTache: TacheProjet[];
  constructor(private tacheService:TacheProjetService , private router:Router,public adminService:AdminService,
    private userService:UtilisateurService,private authService:AuthService){}
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userService.getByEmail(this.currentUser).subscribe((data:Utilisateur)=>{
      console.log(data)
      this.utilisateur=data
      this.tacheService.listTacheByEmp(data.id).subscribe((data:TacheProjet[])=>{
        this.listTache=data
      })
     })
  }
  fini(idt:  number) {
    this.tacheService.fini(idt).subscribe((data:TacheProjet)=>{
      console.log(data)
        if(data.etat==true){
        alert("votre tache a ete fini ")
        this.router.navigate(['/listTache']).then(()=>{
          location.reload()
        })
      }
      
    })
    
      }
}
