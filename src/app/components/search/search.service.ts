import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { IMovie } from 'src/app/model/movie.interface';
import { tap } from 'rxjs/operators';
import { convertMovies } from 'src/app/common/backendToFrontConverter';
import { response } from 'src/assets/mocks/movies.mock';

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
  private _currentSearch = new BehaviorSubject<IMovie[]>(convertMovies(response.Search))

  constructor(private httpClient: HttpClient) { }

  get currentSearch$(): Observable<IMovie[]> {
    return this._currentSearch.asObservable()
  }

  getMovieByFreeText(title: string): Observable<IMovie[]> {
    const paramsToAddToURL = `s=${title}`
    
    return this.getMovie(paramsToAddToURL).pipe(
      tap((response: any) => {
        let movies: IMovie[] = []

        if (response.Response === ESearchResponseStatus.True) {
          movies = convertMovies(response.Search)
        } 
        
        this._currentSearch.next(movies)
      }))
  }

  getMovieByIMDBID(id: string): Observable<any> {
    const paramsToAddToURL = `i=${id}`
    
    return this.getMovie(paramsToAddToURL)
  }

  private getMovie(params: string): Observable<IAPIResponse> {
    const url = `${API_URL}?${params}`

    return this.httpClient.get<IAPIResponse>(url)
  }
}
