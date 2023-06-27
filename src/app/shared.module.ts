import { NgModule } from '@angular/core';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { CommonModule, DatePipe } from '@angular/common';
import { CurrentWeatherComponent } from './components/weather-card/current-weather.component';

@NgModule({
  declarations: [WeatherCardComponent, CurrentWeatherComponent],
  exports: [WeatherCardComponent, CurrentWeatherComponent],
  providers: [DatePipe],

  imports: [CommonModule],
})
export class SharedModule {}
