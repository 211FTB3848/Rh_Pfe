import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordResetService } from 'src/app/_MonServices/motdepasseoublie.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private passwordResetService: PasswordResetService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    this.passwordResetService.resetPassword(this.token, this.password)
      .subscribe({
        next: () => {
          this.snackBar.open('Mot de passe réinitialisé avec succès.', 'Fermer', {
            duration: 3000,
          });
          this.router.navigate(['/login']);
        },
        error: err => {
          this.snackBar.open('Erreur : ' + err.error.message, 'Fermer', {
            duration: 3000,
          });
        }
      });
  }
}
