import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'post-card',
  imports: [CommonModule],
  templateUrl: './postCard.component.html',
})
export class PostCard {
  title = 'post-card';
  @Input() post?: any;
  @Input() user?: any;

  constructor(private postService: PostService) {}

  addLike() {
    if (!this.user) {
      console.log('user not logged in');
      return;
    }
    if (this.post.likes_usernames?.includes(this.user.username)) {
      this.post.likes_usernames = this.post.likes_usernames.filter(
        (name: String) => name !== this.user.username
      );
    } else {
      this.post.likes_usernames?.push(this.user.username);
    }
    const res = this.postService.updatePost(this.post);
    res.subscribe({
      next: (response) => {
        console.log('update successful: ', response);
      },
      error: (error) => {
        console.error('Update failed: ', error);
      },
    });
  }

  addRepost() {
    if (!this.user) {
      console.log('user not logged in');
      return;
    }
    if (this.post.reposts_usernames?.includes(this.user.username)) {
      this.post.reposts_usernames = this.post.reposts_usernames.filter(
        (name: String) => name !== this.user.username
      );
    } else {
      this.post.reposts_usernames?.push(this.user.username);
    }
    const res = this.postService.updatePost(this.post);
    res.subscribe({
      next: (response) => {
        console.log('update successful: ', response);
      },
      error: (error) => {
        console.error('Update failed: ', error);
      },
    });
  }
}
