import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { IMovie } from 'src/app/model/movie.interface';
import { DestroyStreamComponent } from '../destroy-stream/destroy-stream.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent extends DestroyStreamComponent implements OnInit {
  title: string = ''
  poster: string = ''
  rating: string = ''
  generalDetailsMap: Map<string, string> = new Map()

  constructor(private activatedRoute: ActivatedRoute) { 
    super()
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe(({ movieDetails }) => {
      this.title = movieDetails.title
      this.poster = movieDetails.poster
      this.rating = movieDetails.imdbRating

      for (const key in movieDetails) {
        this.generalDetailsMap.set(key, movieDetails[key])
      }

      this.generalDetailsMap.delete('title')
      this.generalDetailsMap.delete('poster')
      this.generalDetailsMap.delete('imdbRating')
      this.generalDetailsMap.delete('imdbID')
    })
  }
}
