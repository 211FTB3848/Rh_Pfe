import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfferEmploi } from '../_MonClasses/OfferEmploi';
 
@Injectable({
  providedIn: 'root'
})
export class OfferEmploiService {
  private baseUrl = 'http://localhost:8080/api/offerEmploi';

  constructor(private http: HttpClient) { }

  // Method to get all offers
  getAllOffer(): Observable<OfferEmploi[]> {
    return this.http.get<OfferEmploi[]>(`${this.baseUrl}/all`);
  }
 
  // Method to get offer by ID
  getOfferByID(id: number): Observable<OfferEmploi> {
    return this.http.get<OfferEmploi>(`${this.baseUrl}/byId/${id}`);
  }

  // Method to save a new offer
  saveOffer(offerEmploi: OfferEmploi, idDep: number): Observable<OfferEmploi> {
    return this.http.post<OfferEmploi>(`${this.baseUrl}/save?idDep=${idDep}`, offerEmploi);
  }

  // Method to update an existing offer
  updateOffer(id: number, offerEmploi: OfferEmploi): Observable<OfferEmploi> {
    return this.http.put<OfferEmploi>(`${this.baseUrl}/update/${id}`, offerEmploi);
  }

   deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  
 
}
