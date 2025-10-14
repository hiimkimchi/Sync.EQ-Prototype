import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.component';
import { DashboardPage } from '../pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePage
    },
    {
        path: 'dashboard',
        component: DashboardPage
    }
];