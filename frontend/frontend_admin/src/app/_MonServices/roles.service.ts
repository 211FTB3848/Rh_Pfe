import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RolesUtilisateur } from '../_MonClasses/RoleUtilisateur';
 
@Injectable({
  providedIn: 'root'
})
export class RolesUtilisateurService {
  
PATH_APP="http://localhost:8080/api/roles/"
  constructor(private httpClient:HttpClient,private authService:AuthService) { }
  
public getAllRoles():Observable<RolesUtilisateur[]>{
    return this.httpClient.get<RolesUtilisateur[]>(`${this.PATH_APP+"allRoles"}`)
}
}
