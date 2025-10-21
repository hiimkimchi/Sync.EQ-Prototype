import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { ENV } from '../core/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = `${ENV.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    getProfile(username: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${username}`);
    }

    getAllProfiles(): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}`);
    }

    updateProfile(username: string, data: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${username}`, data);
    }
}
