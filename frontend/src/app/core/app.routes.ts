import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.component';
import { DashboardPage } from '../pages/dashboard/dashboard.component';
import { ProfilePage } from '../pages/profile/profile.component';
import { authGuard } from '../guards/auth.guard';

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
        path: 'profile',
        component: ProfilePage,
        //When accessing the profile page, the user must be authenticated, or else they will be redirected to the home page
        canActivate: [authGuard]
    }
];