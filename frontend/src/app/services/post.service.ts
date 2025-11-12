import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post';
import { ENV } from '../core/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `${ENV.apiUrl}api/posts`;

  constructor(private http: HttpClient) {}

  private filterTimeStamps(post: Post): Post {
    return {
      ...post,
      createdAt: post.createdAt ? new Date(post.createdAt) : undefined,
      updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined,
    };
  }

  getSpecificUserPosts(username: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.baseUrl}/${username}`)
      .pipe(map((posts) => posts.map((p) => this.filterTimeStamps(p))));
  }

  // will return an array of maxSize 20
  getAllPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.baseUrl}`)
      .pipe(map((posts) => posts.map((p) => this.filterTimeStamps(p))));
  }

  createPost(username: string, data: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/`, data);
  }

  updatePost(post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(
      `${this.baseUrl}/${post.author}/${post.postId}`,
      post
    );
  }
}
