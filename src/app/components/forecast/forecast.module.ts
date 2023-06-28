import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';
import { SharedModule } from '@/app/shared.module';
import { DayWeatherModule } from '../day-weather/day-weather.module';
import { WeatherChartComponent } from '../weather-chart/weather-chart.component';
import { WeatherChartModule } from '../weather-chart/weather-chart.module';

@NgModule({
  declarations: [ForecastComponent],
  imports: [
    CommonModule,
    ForecastRoutingModule,
    SharedModule,
    DayWeatherModule,
    WeatherChartModule,
  ],
})
export class ForecastModule {}
