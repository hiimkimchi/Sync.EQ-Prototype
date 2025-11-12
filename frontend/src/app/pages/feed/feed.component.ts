import { SynceqHeader } from '../../components/homeHeader/homeHeader.component';
import { SynceqFooter } from '../../components/homeFooter/homeFooter.component';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { PostCard } from '../../components/postCard/postCard.component';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../../models/users';
import { CreatePostModal } from '../../components/createPostModal/createPost.component';

@Component({
  selector: 'app-home',
  imports: [SynceqHeader, SynceqFooter, PostCard, CommonModule, CreatePostModal],
  providers: [],
  templateUrl: './feed.component.html',
})
export class FeedPage implements OnInit {
  title = 'explore-page';
  posts?: Post[];
  user?: User;
  showModal = false;

  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
    });
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe({
        next: (res) => {
          this.user = res!;
          this.user.username = res?.nickname;
        },
      });
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
