import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../dto/login-dto';
import { loginResponse } from '../dto/login-response-dto';
import { RegisterDto } from '../dto/register-dto';
import { registerResponse } from '../dto/register-response-dto';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private registerURL = environment.urlBase+'/auth/register';
    private loginURL = environment.urlBase+'/auth/login';
    constructor( private injector:Injector, public jwtHelper: JwtHelperService, private http: HttpClient, private router: Router ) {}
    register(registerDto: RegisterDto): Observable<registerResponse> {
        return this.http.post<registerResponse>(this.registerURL, registerDto, httpOptions);
    }

    login(loginDto: LoginDto): Observable<loginResponse> {
        console.log(JSON.stringify(loginDto))
        return this.http.post<loginResponse>(this.loginURL, loginDto, httpOptions);
    }

    logOut() {
        localStorage.removeItem('token');
        this.router.navigate(["/auth/login"]);
    }
    
    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        const jwtHelper = this.injector.get(JwtHelperService);
        return !this.jwtHelper.isTokenExpired(token);
    }
}