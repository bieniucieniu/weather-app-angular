import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';
import { DayWeatherComponent } from './day-weather/day-weather.component';
import { SharedModule } from '@/app/shared.module';

@NgModule({
  declarations: [ForecastComponent, DayWeatherComponent],
  imports: [NgChartsModule, CommonModule, ForecastRoutingModule, SharedModule],
})
export class ForecastModule {}
