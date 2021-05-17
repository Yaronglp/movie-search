import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { IMovie } from 'src/app/model/movie.interface';
import { DestroyStreamComponent } from '../destroy-stream/destroy-stream.component';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent extends DestroyStreamComponent implements OnInit {
  movies: IMovie[] = []

  constructor(private searchService: SearchService, private cdr: ChangeDetectorRef) {
    super()
   }

  ngOnInit(): void {
    this.registerMovieSearch()
  }

  trackByFn(index: number, movie: IMovie) {
    return movie.imdbID
  }

  private registerMovieSearch() {
    this.searchService.currentSearch$.pipe(takeUntil(this.destroy$)).subscribe((moviesResult: IMovie[]) => {
      this.movies = moviesResult
      this.cdr.markForCheck()
    })
  }
}

