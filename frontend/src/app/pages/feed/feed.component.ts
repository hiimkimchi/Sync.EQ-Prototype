import { SynceqHeader } from '../../components/homeHeader/homeHeader.component';
import { SynceqFooter } from '../../components/homeFooter/homeFooter.component';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { PostCard } from '../../components/postCard/postCard.component';

@Component({
  selector: 'app-home',
  imports: [SynceqHeader, SynceqFooter, PostCard],
  providers: [],
  templateUrl: './feed.component.html',
})
export class FeedPage implements OnInit {
    title = 'explore-page';
    posts?: [Post];
    
    constructor(private postService: PostService
    ) {};

    ngOnInit(): void {
      this.postService.getAllPosts().subscribe({
        next: (data) => {
          console.log(data);
          this.posts = data;
        }
      });
    }
}