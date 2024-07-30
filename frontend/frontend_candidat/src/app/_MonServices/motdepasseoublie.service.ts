import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Méthode pour envoyer un email de réinitialisation
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl+"/forgotPassword/"+email}`, { email });
  }

  // Méthode pour réinitialiser le mot de passe
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl+"/resetPassword?token="+token+"&newPassword="+newPassword}`, { token, newPassword });
  }
}
