import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IMovie } from 'src/app/model/movie.interface';
import { EShowType } from 'src/app/model/search.enum';

const DEFAULT_MOVIE: IMovie = Object.freeze({
  title: 'unknown',
  year: 'unknown',
  poster: 'unknown',
  type: EShowType.UNKNOWN,
  imdbID: 'unknown'
})

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() movieDetails: IMovie = DEFAULT_MOVIE

  constructor(private router: Router) {}

  get title(): string {
    return this.movieDetails.title
  }

  get type(): string {
    return this.movieDetails.type
  }

  get year(): string {
    return this.movieDetails.year
  }

  get poster(): string {
    return this.movieDetails.poster
  }

  onClick() {
    this.router.navigate(['movie', this.movieDetails.imdbID])
  }
}
