import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import customConfig from '../../customConfig.json';
import { IStaff } from '../Interfaces/IStaff';

@Injectable({ providedIn: 'root' })
export class StaffService {

    constructor(private http: HttpClient) { }

    getStaff(staffId: number): Observable<IStaff> {
        return this.http.get<IStaff>(`${customConfig.backend_URL}/${staffId}`);
    }
    
    getStaffs(): Observable<IStaff[]> {
        return this.http.get<IStaff[]>(`${customConfig.backend_URL}/`);
    }
    
    updateStaff(staff: IStaff): Observable<boolean> {
        return this.http.post<boolean>(`${customConfig.backend_URL}/edit/`, staff)
    }
    
    addStaff(staff: IStaff): Observable<number> {
        return this.http.post<number>(`${customConfig.backend_URL}/add`, staff)
    }
    
    deleteStaff(staffId: number): Observable<void> {
        return this.http.get<void>(`${customConfig.backend_URL}/remove/${staffId}`);
    }
}