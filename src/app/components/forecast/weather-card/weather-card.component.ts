import { Component, Input } from '@angular/core';
import * as WeatherDescriptions from '@/assets/weatherDescriptions.json';

export type DailyWeather = {
  temperature_2m_max: number;
  temperature_2m_min: number;
  precipitation_sum: number;
  weathercode: keyof typeof WeatherDescriptions;
  date: Date;

  precipitation_probability?: never;
  temperature_2m?: never;
};

export type HourlyWeather = {
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
  styles: [
    `
      .card {
        color: black;
      }
    `,
  ],
  template: `
    <div class="card">
      <div
        class="card-body"
        *ngIf="isHourlyWeather(); then hourly; else daily"
      ></div>
      <ng-template #hourly>
        <div class="card-title">
          <h5>{{ data.date | date : 'h:mm' }}</h5>
          <img [src]="weatherDescription.day.image" alt="weather-img" />
          <h6>{{ weatherDescription.day.description }}</h6>
          <span>
            {{ data.temperature_2m }}°C
            <span>{{ data.precipitation_probability }}%</span>
          </span>
        </div>
      </ng-template>
      <ng-template #daily>
        <h5>{{ data.date | date : 'MMM d' }}</h5>
      </ng-template>
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

  isHourlyWeather = (): boolean => {
    return 'temperature_2m' in this.data;
  };
  weatherDescription = WeatherDescriptions[this.data.weathercode];
}
