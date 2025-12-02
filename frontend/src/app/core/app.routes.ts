import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.component';
import { ProfilePage } from '../pages/profile/profile.component';
import { CreatePage } from '../pages/create/create.component';
import { CallbackPage } from '../pages/callback/callback.component';
import { NotFoundPage } from '../pages/notFound/notFound.component';
import { ExplorePage } from '../pages/explore/explore.component';
import { FeedPage } from '../pages/feed/feed.component';
import { ChatPage } from '../pages/chat/chat.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePage
    },
    {
        path: 'profile/:username',
        component: ProfilePage
    },
    {
        path: 'create',
        component: CreatePage
    },
    {
        path: 'callback',
        component: CallbackPage
    },
    {
        path: 'explore',
        component: ExplorePage
    },
    {
        path: 'feed',
        component: FeedPage
    },
    {
        path: 'chat',
        component: ChatPage
    },
    {
        path: '**',
        component: NotFoundPage
    },
];