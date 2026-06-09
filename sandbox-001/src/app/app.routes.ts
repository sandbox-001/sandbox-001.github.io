import { Routes } from '@angular/router';
import { Homepage } from './features/homepage/homepage';
import { Christmas } from './features/christmas/christmas/christmas';
import { MoviesAndShows } from './features/movies-and-shows/movies-and-shows/movies-and-shows';
import { NotFound } from './shared/components/not-found/not-found';

export const routes: Routes = [
    {
        path: '',
        component: Homepage
    },
    {
        path: 'christmas',
        component: Christmas
    },
    {
        path: 'movies-and-shows',
        component: MoviesAndShows
    },
    {
        path: '**',
        component: NotFound
    }
];
