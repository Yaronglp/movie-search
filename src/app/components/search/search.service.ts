import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { IMovie } from 'src/app/model/movie.interface';
import { tap } from 'rxjs/operators';
import { convertMovies } from 'src/app/common/backendToFrontConverter';
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
    const movies = this.cacheService.getSearchResult(title)

    if(movies) {
      this._currentSearch.next(movies)
      return of(movies)
    }

    const paramsToAddToURL = `s=${title}`
    
    return this.getMovies(paramsToAddToURL).pipe(
      tap((response: any) => {
        let movies: IMovie[] = []

        if (response.Response === ESearchResponseStatus.True) {
          movies = convertMovies(response.Search)
        } 

        this.cacheService.setSearchResult(title, movies)
        this._currentSearch.next(movies)
      }))
  }

  getMovieByIMDBID(id: string): Observable<any> {
    const paramsToAddToURL = `i=${id}`
    
    return this.getMovies(paramsToAddToURL)
  }

  private getMovies(params: string): Observable<IAPIResponse> {
    const url = `${API_URL}?${params}`

    return this.httpClient.get<IAPIResponse>(url)
  }
}
