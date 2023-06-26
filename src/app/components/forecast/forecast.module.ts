import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';
import { DayWeatherComponent } from './day-weather/day-weather.component';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { CurrentWeatherComponent } from './weather-card/current-weather.component';

@NgModule({
  declarations: [
    ForecastComponent,
    DayWeatherComponent,
    WeatherCardComponent,
    CurrentWeatherComponent,
  ],
  imports: [NgChartsModule, CommonModule, ForecastRoutingModule],
})
export class ForecastModule {}
