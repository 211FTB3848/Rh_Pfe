import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
 import { AuthService } from "../_MonServices/auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private adminAuthService:  AuthService, private router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const addToken = req.headers.get('No-Auth') !== 'True';

        if (addToken && this.adminAuthService.isLoggedIn()) {
            const token = this.adminAuthService.getToken();
            const authReq = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(authReq);
        }  
        return next.handle(req)
    }
      
}