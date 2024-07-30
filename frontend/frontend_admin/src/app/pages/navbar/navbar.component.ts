import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
 import { AdminService } from 'src/app/_MonServices/admin.service';
 import { AuthService } from 'src/app/_MonServices/auth.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any;
   currentUser: any;
  utilisateur: Utilisateur= new Utilisateur();
  nomRole: string;
constructor(private  authService:AuthService,public adminService:AdminService, private userService:UtilisateurService , private router:Router){
  

}
navigateTo(route: string) {
     this.router.navigate([route]).then(()=>{
      location.reload()
     });
 
}
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if(this.authService.isLoggedIn()){
       this.userService.getByEmail(this.currentUser).subscribe((data:Utilisateur)=>{
      console.log(data)
      this.utilisateur=data
      this.nomRole= data.rolesUtilisateur[0].nomRoles
    })
console.log(this.currentUser)
    }
   
    }
     loginOrNot(){
      return this.authService.isLoggedIn();
    
  }
  logout(){
    this.router.navigate(['/login'])
    return this.authService.clear()
  }
 
  goToUserProfils(email: string): void {
  this.router.navigate(['/profils',{email}])
  }
}
