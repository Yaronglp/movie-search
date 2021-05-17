import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-destroy-stream',
  template: ''
})
export class DestroyStreamComponent implements OnDestroy {
  protected destroy$ = new Subject<void>()

  ngOnDestroy() {
    this.destroy$.next()
  }
}
