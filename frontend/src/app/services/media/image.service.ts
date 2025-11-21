import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media, SasURL } from '../../models/media'
import { ENV } from '../../core/environment';

@Injectable({
    providedIn: 'root'
})
export class MediaImageService {
    private baseUrl = `${ENV.apiUrl}api/media`;

    constructor(private http: HttpClient) { }

    getUserProfilePic(user?: string): Observable<SasURL> {
        return this.http.get<SasURL>(`${this.baseUrl}/${user}/profilepic`);
    }


    createUserProfilePic(user: string, file: File): Observable<Media> {
        const form = new FormData();
        form.append('file', file);

        return this.http.post<Media>(`${this.baseUrl}/${user}/profilepic`, form);
    }


    replaceUserProfilePic(user: string, file: File): Observable<Media> {
        const form = new FormData();
        form.append('file', file);

        return this.http.put<Media>(`${this.baseUrl}/${user}/profilepic`, form);
    }
}
