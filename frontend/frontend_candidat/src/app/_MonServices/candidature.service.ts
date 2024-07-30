import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    public saveCandidature(formData: FormData, idCan: number, idOffer:number): Observable<Candidature> {
        return this.http.post<Candidature>(`${this.APP_URL+"save?idCan="+idCan+"&idOffer="+idOffer}`, formData);
    }
    public byCandidat(idcan: number): Observable<Candidature[]> {
        return this.http.get<Candidature[]>(`${this.APP_URL}byCandidat/${idcan}`);
    }
    public findbyEmp(idEmp: number): Observable<Candidature[]> {
        return this.http.get<Candidature[]>(`${this.APP_URL}canByEmp?idEmp=${idEmp}`);
    }
    public accept(id: number): Observable<Candidature> {
        return this.http.get<Candidature>(`${this.APP_URL}accepter/${id}`);
    }
    public refuser(id: number): Observable<Candidature> {
        return this.http.get<Candidature>(`${this.APP_URL}refuser/${id}`);
    }
    public delete(id: number): Observable<Candidature> {
        return this.http.get<Candidature>(`${this.APP_URL}delete/${id}`);
    }
}
