import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pointage } from '../_MonClasses/pointage';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
 
  private baseUrl = 'http://localhost:8080/api/pointage';

  constructor(private http: HttpClient) {}

  marquerPresence(idUtilisateur: number, pointage: Pointage): Observable<any> {
    return this.http.post(`${this.baseUrl}/marquer`, pointage, { params: { idUtilisateur: idUtilisateur.toString() } });
  }
  getAllPointages() : Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${this.baseUrl}/getAll`)
 }
  
  getPointagesByUser(utilisateurId: number): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(`${this.baseUrl}/get`, { params: { utilisateurId: utilisateurId.toString() } });
  }

 
}
