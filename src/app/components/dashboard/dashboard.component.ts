import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  isErrorOccur: boolean = false

  constructor(private cdr: ChangeDetectorRef) {}

  showErrorMsg(showNeeded: boolean) {
    this.isErrorOccur = showNeeded
    this.cdr.detectChanges()
  }
}
