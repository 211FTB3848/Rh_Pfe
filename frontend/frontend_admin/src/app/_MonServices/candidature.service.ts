import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../_MonClasses/Formation';
import { Utilisateur } from '../_MonClasses/Utilisateur';
import { Candidature } from '../_MonClasses/Candidature';



@Injectable({
    providedIn: 'root'
})
export class CandidatureService {
    




    APP_URL = "http://localhost:8080/api/candidature/"
    constructor(private http: HttpClient) { }
 
    public byDep(idcan: number): Observable<Candidature[]> {
        return this.http.get<Candidature[]>(`${this.APP_URL}byDep/${idcan}`);
    }
    getAllCan(): Observable<Candidature[]> {
        return this.http.get<Candidature[]>(`${this.APP_URL}all`);
      }
    public findbyEmp(idEmp: number): Observable<Candidature[]> {
        return this.http.get<Candidature[]>(`${this.APP_URL}canByEmp?idEmp=${idEmp}`);
    }
    public accept(id: number): Observable<Candidature> {
        return this.http.get<Candidature>(`${this.APP_URL}accept/${id}`);
    }
    public refuser(id: number): Observable<Candidature> {
        return this.http.get<Candidature>(`${this.APP_URL}reject/${id}`);
    }
  
  public Download(id: number): Observable<Blob> {
    return this.http.get(`${this.APP_URL}download/${id}`, {
      responseType: 'blob', // Set response type to 'blob' for file download
      headers: new HttpHeaders({
        'Accept': 'application/octet-stream' // Inform the server we expect a file
      })
    });
  }
}
