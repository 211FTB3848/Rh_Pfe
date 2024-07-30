import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidat } from 'src/app/_MonClasses/candidat';
import { Candidature } from 'src/app/_MonClasses/Candidature';
import { OfferEmploi } from 'src/app/_MonClasses/OfferEmploi';
import { Utilisateur } from 'src/app/_MonClasses/Utilisateur';
import { AdminService } from 'src/app/_MonServices/admin.service';
import { AuthService } from 'src/app/_MonServices/auth.service';
import { CandidatureService } from 'src/app/_MonServices/candidature.service';
import { UtilisateurService } from 'src/app/_MonServices/utilisateur.services';

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrls: ['./candidature.component.css']
})
export class CandidatureComponent implements OnInit {
 
  utilisateurs: Utilisateur[];
  utilisateur: Utilisateur;
  role: string;
  http:HttpClient

 
  currentUser: any;
  searchTerm: string = '';
  listCan: Candidature[];

  constructor(private candService: CandidatureService,
              private authService: AuthService,
              public adminService: AdminService,
              private router: Router,
              private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.authService.isLoggedIn()) {
      this.utilisateurService.getByEmail(this.currentUser).subscribe((data: Utilisateur) => {
        this.utilisateur = data;
        if (this.adminService.rolesMatch(['CHEF DAPRATEMENT']) ) {
          this.candService.byDep(this.utilisateur.departement.id).subscribe((data: Candidature[]) => {
            this.listCan = data;
        }  )
          
        } else if (this.adminService.rolesMatch(['ADMIN'])) {
          this.candService.getAllCan().subscribe((data: Candidature[]) => {
            this.listCan = data;
           });
        }
      });
    }
  }
 
  refuser(id: number) {
    if(confirm("voulez vous refuser cette candidture ?")){
      this.candService.refuser(id).subscribe((data:Candidature)=>{
        alert(" vous avez refuser cette candidture ")
        this.router.navigate(['/candidture']).then(()=>{
          location.reload()
        })
      })
    }
  }
    accepter(id: number) {
      if(confirm("voulez vous Accepter cette candidture ?")){
        this.candService.accept(id).subscribe((data:Candidature)=>{
          alert(" vous avez Accepter cette candidture ")
          this.router.navigate(['/candidture']).then(()=>{
            location.reload()
          })
        })
      }  }

 
      downloadNomFile(id: number, fileName: string) {
        this.candService.Download(id).subscribe((blob: Blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName; // Specify the filename for download
          link.click();
          window.URL.revokeObjectURL(url); // Clean up after download
        }, error => {
          console.error('Download error:', error);
        });
      }

 
 
 
   
}
