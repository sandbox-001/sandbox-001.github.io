import { Routes } from '@angular/router';
import { Homepage } from './features/homepage/homepage';
import { Christmas } from './features/christmas/christmas';
import { MoviesAndShows } from './features/movies-and-shows/movies-and-shows';
import { NotFound } from './shared/components/not-found/not-found';
import { Recipes } from './features/recipes/recipes';

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
        path: 'recipes',
        component: Recipes
    },
    {
        path: '**',
        component: NotFound
    }
];
