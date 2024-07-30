import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {  Utilisateur } from '../_MonClasses/Utilisateur';
import { ChefAppartement } from '../_MonClasses/chefdappartement';
import { Employee } from '../_MonClasses/employee';
import { ChefProjet } from '../_MonClasses/chefprojet';
import { Candidat } from '../_MonClasses/candidat';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  
  apiUrl =  "http://localhost:8080/api/utilisateur"
  constructor(
    private http: HttpClient,
 
  ) { }
  saveJobSeeker(jobseeker:Candidat):Observable<Candidat>{
    return this.http.post<Candidat>(`${this.apiUrl+"/save/jobseeker"}`,jobseeker)
  }
  
 public getByEmail(email:string):Observable<Candidat>{
  return this.http.get<Candidat>(`${this.apiUrl+"/bymail/"+email}`)
 }
 
  
 
}