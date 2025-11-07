import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { ENV } from '../core/environment';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private baseUrl = `${ENV.apiUrl}api/posts`;

    constructor(private http: HttpClient) { }

    getSpecificUserPosts(username: string): Observable<Post> {
        return this.http.get<Post>(`${this.baseUrl}/${username}`);
    }

    // will return an array of maxSize 20
    getAllPosts(): Observable<[Post]> {
        return this.http.get<[Post]>(`${this.baseUrl}`);
    }

    createPost(username: string, data: Partial<Post>): Observable<Post> {
        return this.http.post<Post>(`${this.baseUrl}/`, data);
    }
}
