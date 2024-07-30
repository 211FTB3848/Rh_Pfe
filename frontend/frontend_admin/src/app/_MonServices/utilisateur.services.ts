import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {  Utilisateur } from '../_MonClasses/Utilisateur';
import { ChefAppartement } from '../_MonClasses/chefdappartement';
import { Employee } from '../_MonClasses/employee';
import { ChefProjet } from '../_MonClasses/chefprojet';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  
  apiUrl =  "http://localhost:8080/api/utilisateur"
  constructor(
    private http: HttpClient,
 
  ) { }
  public getAllChefDepartment():Observable<ChefAppartement[]>{
    return this.http.get<ChefAppartement[]>(`${this.apiUrl+"/listChefDep"}`)
  }
  public updateChefProjet(id: number, utilisateur: ChefProjet): Observable<ChefProjet> {
    return this.http.put<ChefProjet>(`${this.apiUrl}/updateChefProjet/${id}`, utilisateur);
  }
  public updateChefAppartment(id: number, utilisateur: ChefAppartement): Observable<ChefAppartement> {
    return this.http.put<ChefAppartement>(`${this.apiUrl}/updatechefAppartement/${id}`, utilisateur);
  }
  public updateEmployee(id: number, utilisateur: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/updateEmployee/${id}`, utilisateur);
  }
  activer(id: number) : Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/active/${id}`);

   }
  public getAllChefProjet():Observable<ChefProjet[]>{
    return this.http.get<ChefProjet[]>(`${this.apiUrl+"/listChefProjet"}`)
  }
  public getAllEmp():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl+"/listEMPLOYEE"}`)
  }
  public getAllUtilisateurByRoleAndDep(id:number):Observable<Employee[]>{
    return this.http.get<Employee[]>(`${this.apiUrl+"/by-role-and-department/"+id}`)
  }
  public getAllChefProjetByRoleAndDep(id:number):Observable<ChefProjet[]>{
    return this.http.get<ChefProjet[]>(`${this.apiUrl+"/by-role-and-department/"+id}`)
  }
  public getChefById(id:number):Observable<ChefAppartement>{
    return this.http.get<ChefAppartement>(`${this.apiUrl+"/byId/"+id}`)
  }
  public getEmployeeById(id:number):Observable<Employee>{
    return this.http.get<Employee>(`${this.apiUrl+"/byId/"+id}`)
  }
 public saveChefDep(utilisateur:Utilisateur):Observable<ChefAppartement>{
  return this.http.post<ChefAppartement>(`${this.apiUrl+"/saveChefDep"}`,utilisateur)
 }
 public saveChefPrj(utilisateur:FormData):Observable<ChefProjet>{
  return this.http.post<ChefProjet>(`${this.apiUrl+"/saveChefProjet"}`,utilisateur)
 }
 public saveEmployeur(utilisateur:FormData):Observable<Employee>{
  return this.http.post<Employee>(`${this.apiUrl+"/saveEmployeur"}`,utilisateur)
 }
 public getByEmail(email:string):Observable<Utilisateur>{
  return this.http.get<Utilisateur>(`${this.apiUrl+"/bymail/"+email}`)
 }
 public byDepChefAppartement(id:number):Observable<ChefAppartement[]>{
  return this.http.get<ChefAppartement[]>(`${this.apiUrl+"/byDepChefAppartement/"+id}`)
 }
 public byDepEmployee(id:number):Observable<Employee[]>{
  return this.http.get<Employee[]>(`${this.apiUrl+"/byDepEmployee/"+id}`)
 }
 
 public byDepChefProjet(id:number):Observable<ChefProjet[]>{
  return this.http.get<ChefProjet[]>(`${this.apiUrl+"/byDepChefProjet/"+id}`)
 }
 
}