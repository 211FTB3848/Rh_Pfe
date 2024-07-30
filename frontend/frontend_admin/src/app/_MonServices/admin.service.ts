import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Utilisateur } from '../_MonClasses/Utilisateur';
 
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
PATH_APP="http://localhost:8080/auth/"
  constructor(private httpClient:HttpClient,private authService:AuthService) { }
  requestHeader = new HttpHeaders({
	   
		   "No-Auth":"True" 
	   }
  )
  public loginAdmin(loginData:any){
	  return this.httpClient.post<any>(`${this.PATH_APP+"login"}`,loginData,{headers:this.requestHeader})
  }
  inscriptionAdmin(admin: Utilisateur) :Observable<Utilisateur>{
	return this.httpClient.post<Utilisateur>(`${this.PATH_APP+"saveAdmin"}`, admin)
  
   }

  getUserInformation(): Observable<any> {
    const token = this.authService.getToken(); 

    if (!token) {
      throw new Error('No authentication token found');
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.httpClient.get<any>(this.PATH_APP+"getConnectedUser", { headers });
  }
  public rolesMatch(allowedRoles:any):boolean{
	 let isMatch=false;
	 const adminRoles:any=this.authService.getRoles();
	 if(adminRoles != null && adminRoles){
		 for(let i=0 ; i<adminRoles.length; i++){
			 for(let j=0;j<allowedRoles.length;j++){
				if(adminRoles[i].nomRoles === allowedRoles[j]){
					 isMatch=true;
				 return isMatch;
				}else{
					return isMatch;
				}
				
			 }
		 }
		 
	 }
	 return isMatch;
	 }
	  
 

}
