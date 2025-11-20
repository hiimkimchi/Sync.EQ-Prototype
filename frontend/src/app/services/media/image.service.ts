import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media } from '../../models/media'
import { ENV } from '../../core/environment';

@Injectable({
    providedIn: 'root'
})
export class MediaImageService {
    private baseUrl = `${ENV.apiUrl}api/media`;

    constructor(private http: HttpClient) { }

    getUserProfilePic(user?: string): Observable<Media> {
        return this.http.get<Media>(`${this.baseUrl}/${user}/profilepic`);
    }
}
