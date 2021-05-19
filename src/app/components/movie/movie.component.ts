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
  movie: IMovie | null = null

  constructor(private activatedRoute: ActivatedRoute) { 
    super()
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntil(this.destroy$)).subscribe(({ movieDetails }) => {
      this.movie = movieDetails
    })
  }
}
