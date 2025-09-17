import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './core/guards/auth.guard';
import { ClientPanelComponent } from './pages/client-panel/client-panel.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard]
    },
    {
        path: 'client',
        component: ClientPanelComponent,
    }
];
