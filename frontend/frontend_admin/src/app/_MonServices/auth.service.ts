import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:8080/auth";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }

  public setRoles(roles: any[]): void {
    localStorage.setItem("rolesUtilisateur", JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const roles = localStorage.getItem('rolesUtilisateur');
    return roles ? JSON.parse(roles) : [];
  }

  public setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  clear(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rolesUtilisateur');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken ? decodedToken.user?._id : null;
  }

  getCurrentUser(): any {
    const token = this.getToken();
    if (token) {
      const jwtHelper = new JwtHelperService();
      const decodedToken = jwtHelper.decodeToken(token);
      return decodedToken ? decodedToken.sub : null;
    }
    return null;
  }
}
