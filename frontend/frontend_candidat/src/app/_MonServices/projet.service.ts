import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {  Utilisateur } from '../_MonClasses/Utilisateur';
import { Projet } from '../_MonClasses/projet';
@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  apiUrl =  "http://localhost:8080/api/projet"
  constructor(
    private http: HttpClient,
 
  ) { }
  public getAllProjet():Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.apiUrl+"/allProjet"}`)
  }
public addNewProjet(prj:Projet):Observable<Projet>{
    return this.http.post<Projet>(`${this.apiUrl+"/saveProjet"}`,prj)
}
public findByIdProjet(id:number):Observable<Projet>{
  return this.http.get<Projet>(`${this.apiUrl+"/projetByid/"+id}`)
}
public findByChefProjet(id:number):Observable<Projet[]>{
  return this.http.get<Projet[]>(`${this.apiUrl+"/bychefProjet/"+id}`)
}
public findByDep(id:number):Observable<Projet[]>{
  return this.http.get<Projet[]>(`${this.apiUrl+"/byDep/"+id}`)
}
public getAllProjetByResposable(id:number):Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.apiUrl+"/allProjetResponsable/"+id}`)
  }
    public updateProjet(projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/updateProjet`, projet);
  }
  public deleteProjet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteProjet/${id}`);
  }
  
}