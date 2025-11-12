import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'create-post-modal',
  templateUrl: './createPost.component.html',
  imports: [FormsModule]
})
export class CreatePostModal {
  @Input() user?: any;
  @Output() closed = new EventEmitter<void>(); // notify parent when modal closes

  title = '';
  content = '';

  constructor(private postService: PostService) {}

  submitPost() {
    const postData = { 
        title: this.title, 
        content: this.content, 
        author: this.user?.username 
    };
    this.postService.createPost(this.user.username, postData).subscribe({
      next: (res) => {
        console.log('Post created', res);
        this.closeModal();
      },
      error: (err) => console.error(err)
    });
  }

  closeModal() {
    this.closed.emit();
  }
}
