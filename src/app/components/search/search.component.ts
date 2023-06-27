import { StorageService } from '@/app/services/storage.service';
import { Weather, WeatherService } from '@/app/services/weather.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  template: ` <app-search-bar></app-search-bar>
    <app-current-weather
      *ngIf="lastSearch"
      [data]="data"
      [locationName]="lastSearch.name"
    ></app-current-weather>`,
  styles: [],
})
export class SearchComponent {
  constructor(
    private weather: WeatherService,
    private storage: StorageService
  ) {}

  lastSearch = this.storage.getLastSearch();
  weatherSub = new Subscription();
  data: Weather['current_weather'] = {
    temperature: 0,
    weathercode: '0',
    winddirection: 0,
    windspeed: 0,
  };

  ngOnInit() {
    if (this.lastSearch) {
      this.weatherSub = this.weather
        .getCurrentWeather(this.lastSearch)
        .subscribe((e) => {
          this.data = e.current_weather;
        });
    }
  }
}
