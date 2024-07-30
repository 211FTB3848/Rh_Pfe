import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {  Utilisateur } from '../_MonClasses/Utilisateur';
import { Projet } from '../_MonClasses/projet';
import { Departement } from '../_MonClasses/dep';
@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  apiUrl =  "http://localhost:8080/api/dep"
  constructor(
    private http: HttpClient,
 
  ) { }
  public getAllDep():Observable<Departement[]>{
    return this.http.get<Departement[]>(`${this.apiUrl+"/list"}`)
  }
public addNewDep(dep:Departement):Observable<Departement>{
    return this.http.post<Departement>(`${this.apiUrl+"/save"}`,dep)
}
public findByIdDep(id:number):Observable<Departement>{
  return this.http.get<Departement>(`${this.apiUrl+"/byId/"+id}`)
}
public deleteByID(id:number){
    return this.http.delete(`${this.apiUrl+"/deleteById/"+id}`)
  }
}