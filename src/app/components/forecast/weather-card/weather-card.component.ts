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
        box-shadow: var(--shadow);
        border-radius: 1rem;
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        h5 {
          margin: 0;
        }
      }

      .row {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }

      .drop {
        width: 0.5rem;
      }
      .dim-text {
        color: var(--dim-text-color);
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
        <h5>{{ weatherDescription.day.description }}</h5>
        <img [src]="weatherDescription.day.image" alt="weather-img" />
        <span class="row">
          <span> {{ data.temperature_2m }}°C</span>
          <span class="dim-text"
            ><img class="drop" src="assets/drop.svg" alt="" />{{
              data.precipitation_probability
            }}%</span
          >
        </span>

        <h5>{{ data.date | date : 'h:mm' }}</h5>
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
