import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import customConfig from '../../customConfig.json';


export interface ICounter {
    counter: number,
}


@Injectable({ providedIn: 'root' })
export class ResearchLabService_Counter {

    constructor(private http: HttpClient) { }

    Counter(): Observable<ICounter> { 
        return this.http.get<ICounter>(`${customConfig.backend_URL}/ResearchLab/Counter`); 
    }

}