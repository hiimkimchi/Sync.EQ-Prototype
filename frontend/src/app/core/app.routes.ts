import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.component';
import { DashboardPage } from '../pages/dashboard/dashboard.component';
import { ProfilePage } from '../pages/profile/profile.component';
import { authGuard } from '../guards/auth.guard';
import { CreatePage } from '../pages/create/create.component';
import { CallbackPage } from '../pages/callback/callback.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePage
    },
    {
        path: 'welcome',
        component: DashboardPage,
        canActivate: [authGuard]
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
];