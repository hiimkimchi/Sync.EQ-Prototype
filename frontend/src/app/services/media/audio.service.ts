import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Media, SasURL } from '../../models/media'
import { ENV } from '../../core/environment';

@Injectable({
    providedIn: 'root'
})
export class MediaAudioService {
    private baseUrl = `${ENV.apiUrl}api/media`;

    constructor(private http: HttpClient) { }

    getUserAudio(user?: string): Observable<SasURL> {
        return this.http.get<SasURL>(`${this.baseUrl}/${user}/audio`);
    }


    getUserAudioFile(user?: string, filepath?: string): Observable<SasURL> {
        return this.http.get<SasURL>(`${this.baseUrl}/${user}/audio/${filepath}`);
    }


    createUserAudio(user: string, file: File): Observable<Media> {
        const form = new FormData();
        form.append('file', file);

        return this.http.post<Media>(`${this.baseUrl}/${user}/audio`, form);
    }
}