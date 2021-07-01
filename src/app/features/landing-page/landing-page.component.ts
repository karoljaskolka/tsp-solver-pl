import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { getRandomRoute } from 'src/app/utils/route';

@Component({
  selector: 'tsp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  route: Array<number> = [];

  ngOnInit(): void {
    this.route = getRandomRoute(18);
  }
}
