import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post';

@Component({
  selector: 'post-card',
  imports: [CommonModule],
  templateUrl: './postCard.component.html',
})
export class PostCard {
    title = 'post-card';
    @Input() post?: any;
}