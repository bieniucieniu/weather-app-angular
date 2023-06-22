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
      <button (click)="onClick()">log data</button>
    </div>
  `,
})
export class ForecastComponent {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private weather: WeatherService
  ) {}
  params: WeatherProps = {
    latitude: 0,
    longitude: 0,
  };
  weatherData: Weather = {};

  ngOnInit() {
    this.ActivatedRoute.queryParams.subscribe((params: Params) => {
      this.params = {
        latitude: Number(params['latitude']),
        longitude: Number(params['longitude']),
        forecastDays: params['forecastDays']
          ? Number(params['forecastDays'])
          : 7,
      };
    });
    this.weather
      .getWeather(this.params)
      .subscribe((e) => (this.weatherData = e));
  }
  onClick() {
    console.log(this.weatherData);
  }
}
