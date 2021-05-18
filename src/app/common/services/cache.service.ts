import { Injectable } from '@angular/core';
import { IMovie } from 'src/app/model/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private _searchAndMoviesMap: Map<string, IMovie[]> = new Map()
  
  getSearchResult(searchVal: string): IMovie[] | undefined {
    return this._searchAndMoviesMap.get(searchVal)
  }

  setSearchResult(searchVal: string, movies: IMovie[]) {
    this._searchAndMoviesMap.set(searchVal, movies)
  }
}
