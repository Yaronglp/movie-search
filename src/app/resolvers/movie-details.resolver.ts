import { Injectable } from '@angular/core';
import {
  Resolve, ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SearchService } from '../components/search/search.service';
import { IMovie } from '../model/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsResolver implements Resolve<IMovie | null> {

  constructor(private searchService: SearchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovie | null> {
    const id = route.params['id']

    if (!id) {
      return of(null)
    }

    return this.searchService.getMovieByIMDBID(id)
  }
}
