import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ':filter',
        loadChildren: () => import('./todo/todo.routes')
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'all'
    }
];
