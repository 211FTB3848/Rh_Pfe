import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../_MonClasses/Formation';
import { Utilisateur } from '../_MonClasses/Utilisateur';

 

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  
 

  private baseUrl = 'http://localhost:8080/api/formations';

  constructor(private http: HttpClient) { }
  findByIdFormation(id: number): Observable<Formation>  {
    return this.http.get<Formation>(`${this.baseUrl+"/byId/"+id}`)
  }
  ajouterFormation(formation: Formation, idDep:number): Observable<Formation> {
    return this.http.post<Formation>(`${this.baseUrl+"/ajouter?idDep="+idDep}`,formation)
  }
  getAllFormation() :Observable<Formation[]>{
    return this.http.get<Formation[]>(`${this.baseUrl+"/list"}`)
}
getAllFormationByDep(id:number) :Observable<Formation[]>{
  return this.http.get<Formation[]>(`${this.baseUrl+"/byDep/"+id}`)
}
ajouterFormateur(formation:Formation):Observable<Formation>{
   return this.http.put<Formation>(`${this.baseUrl+"/ajouterFormateur"}`,formation)
}
ajouterMembres(formationId: number, memberIds: number): Observable<Formation> {
  return this.http.put<Formation>(`${this.baseUrl}/ajouterMembres?formationId=${formationId}`, memberIds);
}
}
