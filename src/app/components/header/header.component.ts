import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

const MAIN_COMPONENT_URL = '/dashboard'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  showBackToDashboard: boolean = false

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.listenRouterChanges()
  }
  
  private listenRouterChanges() {
    this.router.events.subscribe((routerEvent: any) => {
      if (routerEvent instanceof NavigationEnd) {
        this.showBackToDashboard = routerEvent.url !== MAIN_COMPONENT_URL
        this.cdr.markForCheck()
      }
    })
  }
}
