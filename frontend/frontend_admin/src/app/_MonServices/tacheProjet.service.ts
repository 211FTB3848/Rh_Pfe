import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TacheProjet } from '../_MonClasses/tacheProjet';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TacheProjetService {
  PATH_APP = "http://localhost:8080/api/tache";

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  public getTacheByProjet(id: number): Observable<TacheProjet[]> {
    return this.httpClient.get<TacheProjet[]>(`${this.PATH_APP}/tacheByProjet/${id}`);
  }

  public fini(id: number): Observable<TacheProjet> {
    return this.httpClient.get<TacheProjet>(`${this.PATH_APP}/fini/${id}`);
  }

  public saveTache(tache: FormData, idProjet: number): Observable<TacheProjet> {
    return this.httpClient.post<TacheProjet>(`${this.PATH_APP}/saveTache?idProjet=`+idProjet, tache);
  }

  public updateTache(id: number, tache: FormData): Observable<TacheProjet> {
    return this.httpClient.put<TacheProjet>(`${this.PATH_APP}/update/${id}`, tache);
  }

  public deleteTache(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.PATH_APP}/delete/${id}`);
  }

  public listTacheByEmp(id: number): Observable<TacheProjet[]> {
    return this.httpClient.get<TacheProjet[]>(`${this.PATH_APP}/tacheByEmp/${id}`);
  }
}
