import { SynceqHeader } from '../../components/homeHeader/homeHeader.component';
import { SynceqFooter } from '../../components/homeFooter/homeFooter.component';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users';

@Component({
  selector: 'app-home',
  imports: [SynceqHeader, SynceqFooter],
  providers: [],
  templateUrl: './feed.component.html',
})
export class FeedPage implements OnInit {
    title = 'explore-page';
    auth0Info = {} as User ;
    
    constructor() {};

    ngOnInit(): void {
    }
}