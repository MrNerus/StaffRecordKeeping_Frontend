import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import customConfig from '../../customConfig.json';
import { IStaff } from '../Interfaces/IStaff';
import { IName } from '../Interfaces/IName';

@Injectable({ providedIn: 'root' })
export class ResearchLabService {

    constructor(private http: HttpClient) { }

    iAm(name: string): Observable<void> { 
        return this.http.get<void>(`${customConfig.backend_URL}/ResearchLab/IAm/${name}`); 
    }

    whoAmI(): Observable<IName> { 
        return this.http.get<IName>(`${customConfig.backend_URL}/ResearchLab/WhoAmI`); 
    }

}