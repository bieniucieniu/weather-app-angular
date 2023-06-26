import { Component, Input } from '@angular/core';
import * as WeatherDescriptions from '@/assets/weatherDescriptions.json';

type DailyWeather = {
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_sum: number;
  weathercode: keyof typeof WeatherDescriptions;
  date: Date;

  precipitation_probability?: never;
  temperature_2m?: never;
};

type HourlyWeather = {
  precipitation_probability: number;
  temperature_2m: number;
  weathercode: keyof typeof WeatherDescriptions;
  date: Date;

  temperature_2m_max?: never;
  temperature_2m_min?: never;
  precipitation_sum?: never;
};

type Weather = DailyWeather | HourlyWeather;

@Component({
  selector: 'app-weather-card',
  styles: [],
  template: `
    <div class="card">
      <div
        class="card-body"
        *ngIf="data.temperature_2m; then thenBlock; else elseBlock"
      ></div>
      <ng-template #thenBlock>
        <div class="card-title">
          <h5>{{ data.date | date : 'h:mm' }}</h5>
        </div>
        <div class="card-text">
          <p>Temperature: {{ data.temperature_2m }}°C</p>
          <p>Precipitation: {{ data.precipitation_probability }}%</p>
          <p>Weather: {{ weatherDescription.day.description }}</p>
        </div>
      </ng-template>
      <ng-template #elseBlock> </ng-template>
    </div>
  `,
})
export class WeatherCardComponent {
  @Input() data: Weather = {
    precipitation_probability: 0,
    temperature_2m: 0,
    weathercode: '0',
    date: new Date(),
  };
  weatherDescription = WeatherDescriptions[this.data.weathercode];
}
