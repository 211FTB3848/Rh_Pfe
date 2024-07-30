import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../_MonClasses/Utilisateur';
import { Conge } from '../_MonClasses/conge';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private apiUrl = 'http://localhost:8080/api/conge';

  constructor(private http: HttpClient) {}

  demandeConge(conge: Conge, idEmp: number): Observable<Conge> {
    return this.http.post<Conge>(`${this.apiUrl}/demande?idEmp=${idEmp}`, conge);
  }

  listConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/list`);
  }

  findByEmployeur(id: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/byEmployeur/`+id);
  }

  findByDepartement(departementId: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/byDepartement?departementId=${departementId}`);
  }

  findAllForAdmin(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/allForAdmin`);
  }
  acceptConge(id: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/accept/${id}`, {});
  }

  refuseConge(id: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/refuse/${id}`, {});
  }
}
