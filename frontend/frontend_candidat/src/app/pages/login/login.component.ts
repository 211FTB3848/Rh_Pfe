import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_MonServices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message?: string;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void { }

  login(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.authService.login(form.value).subscribe(
      (data: any) => {
        console.log(data);
        this.authService.setRoles(data.utilisateurs.rolesUtilisateur);
        this.authService.setToken(data.token);
        if (data){
          window.alert("Bienvenue " + data.utilisateurs.email);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        } 
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.message = "Email ou mot de passe invalide. Veuillez réessayer.";
        } else {
          this.message = "Quelque chose n'a pas fonctionné. Veuillez vérifier vos informations.";
        }
        this.router.navigate(['/login']);
      }
    );
  }
}
