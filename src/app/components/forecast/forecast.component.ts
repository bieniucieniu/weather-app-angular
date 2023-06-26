import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  WeatherService,
  type Weather,
  type WeatherProps,
} from '@/app/services/weather.service';
@Component({
  selector: 'app-forecast',
  styles: [``],
  template: `
    <div>
      <app-day-weather [params]="params"></app-day-weather>
    </div>
  `,
})
export class ForecastComponent {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private weather: WeatherService
  ) {}
  params: Parameters<typeof this.weather.getDay>[0] = {
    latitude: 0,
    longitude: 0,
  };

  ngOnInit() {
    this.ActivatedRoute.queryParams.subscribe((params: Params) => {
      this.params = {
        latitude: params['latitude'] as number,
        longitude: params['longitude'],
      };
    });
  }
}
