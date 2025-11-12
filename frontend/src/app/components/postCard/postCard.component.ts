import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';
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
      if(!this.user) {
        console.log("user not logged in")
        return;
      }
      if(this.post.likes_usernames?.includes(this.user.username)) {
        return;
      }
      this.post.likes_usernames?.push(this.user.username);
      this.postService.updatePost(this.post);
    }

    addRepost() {
      if(!this.user) {
        console.log("user not logged in")
        return;
      }
      if(this.post.reposts_usernames?.includes(this.user.username)) {
        return;
      }
      this.post.reposts_usernames?.push(this.user.username);
      this.postService.updatePost(this.post);
    }
}