import { Component, Input } from '@angular/core';
import {
  WeatherService,
  type WeatherProps,
  type Weather,
} from '@/app/services/weather.service';
import type * as WeatherDescriptions from '@/assets/weatherDescriptions.json';

type HourlyWeather = {
  temperature_2m: number;
  precipitation_probability: number;
  weathercode: keyof typeof WeatherDescriptions;
  date: Date;
}[];
@Component({
  selector: 'app-day-weather',
  styles: [
    `
      div.main {
        color: black;
      }
      div.list-wraper {
        display: flex;
        max-width: 100%;
        overflow-x: auto;
      }
      ul.list {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        list-style: none;
        padding: 0;
        margin: 00.5rem;
      }
    `,
  ],
  template: `
    <div class="main">
      <button (click)="onClick()">log data</button>
      <div class="current-weather"></div>
      <div class="list-wraper">
        <ul class="list">
          <li *ngFor="let data of hourlyWeather">
            <app-weather-card [data]="data"></app-weather-card>
          </li>
        </ul>
      </div>
    </div>
  `,
})
export class DayWeatherComponent {
  constructor(private weather: WeatherService) {}
  ngOnInit() {
    this.weather
      .getDay({
        date: new Date(),
        current_weather: true,
        ...this.params,
      })
      .subscribe((e) => {
        if (!e) return;
        this.hourlyWeather = e.hourly.time.map((time, i) => ({
          temperature_2m: e.hourly.temperature_2m[i],
          precipitation_probability: e.hourly.precipitation_probability[i],
          weathercode: e.hourly.weathercode[
            i
          ].toString() as keyof typeof WeatherDescriptions,
          date: new Date(time * 1000),
        }));
        console.log(e);

        this.currentWeather = {
          ...e.current_weather,
        };
      });
  }
  @Input() params: WeatherProps & { date?: Date } = {
    latitude: 0,
    longitude: 0,
  };

  currentWeather: Weather['current_weather'] = {
    time: 0,
    temperature: 0,
    weathercode: 0,
    winddirection: 0,
    windspeed: 0,
  };
  hourlyWeather: HourlyWeather = [];
  length: number = 0;
  onClick() {
    console.log(this);
  }
}
