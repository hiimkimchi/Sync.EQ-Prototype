import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapSearch } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapSearch })],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'synceq';
}
