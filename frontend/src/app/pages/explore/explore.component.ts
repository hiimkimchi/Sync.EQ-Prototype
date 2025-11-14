import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { bootstrapMusicNoteBeamed } from '@ng-icons/bootstrap-icons';
import { ProfileCard } from '../../components/profileCard/profileCard.component';
import { SynceqHeader } from '../../components/homeHeader/homeHeader.component';
import { SynceqFooter } from '../../components/homeFooter/homeFooter.component';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProfileCard, SynceqHeader, SynceqFooter],
  providers: [provideIcons({ bootstrapMusicNoteBeamed })],
  templateUrl: './explore.component.html',
})
export class ExplorePage implements OnInit {
  title = 'explore-page';
  auth0Info = {} as User;
  filters = {
    username: '',
    genre: '',
    professions: [] as string[]
  };
  cards:User[];

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.cards = [];
  }

  ngOnInit(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe({
        next: (res) => {
          this.auth0Info.username = res?.nickname;
        },
      });
    }
    this.activatedRoute.queryParams.subscribe(params => {
      this.filters.username = params['username'];
      this.filters.genre = params['genre'];
      this.filters.professions = params['professions']
      this.userService.getFilteredProfiles(this.filters).subscribe({
        next: (res) => this.cards = res,
        error: (err) => console.error('Error fetching profiles', err)
      });
    });
  }

  routeToProfile(): void {
    this.router.navigate(['/profile', this.auth0Info.username]);
  }
}
