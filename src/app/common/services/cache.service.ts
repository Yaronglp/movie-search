import { Injectable } from '@angular/core';
import { IMovie } from 'src/app/model/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private _searchAndMoviesMap: Map<string, IMovie[] | IMovie> = new Map()
  
  getSearchResult(searchVal: string): IMovie[] | IMovie | undefined {
    return this._searchAndMoviesMap.get(searchVal)
  }

  setSearchResult(searchVal: string, data: IMovie[] | IMovie) {
    this._searchAndMoviesMap.set(searchVal, data)
  }
}
