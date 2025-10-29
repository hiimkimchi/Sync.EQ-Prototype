import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-not-found',
  imports: [CommonModule, RouterModule],
  templateUrl: './notFound.component.html',
  styleUrl: './notFound.component.css',
})

export class NotFoundPage {
    title = 'not-found-page';
}