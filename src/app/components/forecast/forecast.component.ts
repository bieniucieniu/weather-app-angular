import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WeatherService } from '@/app/services/weather.service';
@Component({
  selector: 'app-forecast',
  styles: [``],
  template: `
    <div>
      <app-day-weather [params]="params"></app-day-weather>
      <app-weather-chart [params]="params"></app-weather-chart>
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
        name: params['name'],
      };
    });
  }
}
