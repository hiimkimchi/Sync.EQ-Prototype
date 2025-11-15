import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { ENV } from '../core/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = `${ENV.apiUrl}api/users`;

    constructor(private http: HttpClient) { }

    getProfile(username: string|undefined): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${username}`);
    }

    getAllProfiles(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}`);
    }

    getFilteredProfiles(filters: { username?: string, genre?: string, professions?: string[] }): Observable<User[]> {
        var params = new HttpParams();

        if (filters.genre) {
            params = params.set("genre", filters.genre);
        }

        if (filters.username) {
            params = params.set("username", filters.username);
        }

        if (filters.professions && filters.professions.length > 0) {
            filters.professions.forEach(profession => {
                params = params.append("professions", profession);
            });
        }
        return this.http.get<User[]>(`${this.baseUrl}/search`, {params})
    }

    updateProfile(username: string, data: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${username}`, data);
    }
}
