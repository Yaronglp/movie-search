import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieDetailsResolver } from './resolvers/movie-details.resolver';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'movie',
    children: [
      {
        path: ':id',
        component: MovieComponent,
        resolve: { movieDetails: MovieDetailsResolver }
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
