import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { IMovie } from 'src/app/model/movie.interface';
import { map, switchMap, tap } from 'rxjs/operators';
import { convertMovie, convertMovies } from 'src/app/common/backendToFrontConverter';
import { CacheService } from 'src/app/common/services/cache.service';

const API_URL = "http://www.omdbapi.com/"

interface IAPIResponse {
  Search: IMovie[]
  Response: ESearchResponseStatus
}

enum ESearchResponseStatus {
  False = 'False',
  True = 'True'
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _currentSearch = new BehaviorSubject<IMovie[]>([])

  constructor(private httpClient: HttpClient, private cacheService: CacheService) { }

  get currentSearch$(): Observable<IMovie[]> {
    return this._currentSearch.asObservable()
  }

  getMoviesByFreeText(title: string): Observable<IMovie[]> {
    const moviesInCache = this.getMovieFromCache(title)

    if (moviesInCache) {
      return of(moviesInCache as IMovie[])
    }

    const paramsToAddToURL = `s=${title}`
    
    return this.getMovies(paramsToAddToURL).pipe(tap((movies: IMovie[]) => {
        this.cacheService.setSearchResult(title, movies)
        this._currentSearch.next(movies)
      })
    )
  }

  getMovieByIMDBID(id: string): Observable<IMovie> {
    const movieInCache = this.getMovieFromCache(id) 

    if (movieInCache) {
      return of(movieInCache as IMovie)
    }

    const paramsToAddToURL = `i=${id}`
    
    return this.getMovies(paramsToAddToURL).pipe(switchMap((movies: IMovie[]) => of(movies[0])), tap((movie: IMovie) => {
        this.cacheService.setSearchResult(id, movie)
      })
    )
  }

  private getMovieFromCache(key: string): IMovie[] | IMovie | undefined  {
    return this.cacheService.getSearchResult(key)
  }

  private getMovies(params: string): Observable<IMovie[]> {
    const url = `${API_URL}?${params}`

    return this.httpClient.get<IAPIResponse>(url).pipe(
      map((response: any) => {
        let movies: IMovie[] = []

        if (response.Response === ESearchResponseStatus.False) {
          this._currentSearch.next([]) 
        } else {
          movies = this.getMoviesList(response)
        }

        return movies
      }))
  }

  private getMoviesList(response: IAPIResponse): IMovie[] {
    return response.Search ? convertMovies(response.Search) : convertMovie(response)
  }
}
