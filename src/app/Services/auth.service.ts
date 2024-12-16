import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import customConfig from '../../customConfig.json';
import { IEncrypt, IEncrypt_Response } from '../Interfaces/IName copy';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }

    encrypt(data: IEncrypt): Observable<IEncrypt_Response> {
        return this.http.post<IEncrypt_Response>(`${customConfig.backend_URL}/auth/encrypt`, data);
    }
    decrypt(data: IEncrypt): Observable<IEncrypt_Response> {
        return this.http.post<IEncrypt_Response>(`${customConfig.backend_URL}/auth/decrypt`, data);
    }
    
}