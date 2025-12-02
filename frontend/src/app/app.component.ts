import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs'
import { CommonModule } from '@angular/common';
import { SynceqHeader } from './components/homeHeader/homeHeader.component';
import { SynceqFooter } from './components/homeFooter/homeFooter.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SynceqHeader, SynceqFooter],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'synceq';
  showLayout = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentRoute = event.urlAfterRedirects;
        this.showLayout = !currentRoute.includes('/create');
      });
  }
}
