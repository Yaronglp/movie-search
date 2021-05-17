import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DestroyStreamComponent } from '../destroy-stream/destroy-stream.component';
import { SearchService } from './search.service';
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent extends DestroyStreamComponent {
  searchInput: string = ''

  constructor(private searchService: SearchService, private cdr: ChangeDetectorRef) { 
    super()
  }

  onSearchClick() {
    this.searchService.getMovieByFreeText(this.searchInput).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.resetInput()
    })
  }

  get isSearchInputExists(): boolean {
    return this.searchInput.length > 2
  }

  @HostListener('window:keyup.enter') enterKeyPress() {
    if (!this.searchInput) {
      return
    }

    this.onSearchClick()
  }

  private resetInput() {
    this.searchInput = ''
    this.cdr.markForCheck()
  }
}
