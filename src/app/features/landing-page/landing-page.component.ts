import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'tsp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  route: Array<number> = [];

  ngOnInit(): void {
    // Best found route by methods
    this.route = [15, 8, 5, 7, 12, 6, 4, 10, 16, 17, 3, 13, 11, 1, 14, 2, 9, 0];
  }
}
