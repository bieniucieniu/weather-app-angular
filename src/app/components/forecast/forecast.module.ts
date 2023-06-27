import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';
import { SharedModule } from '@/app/shared.module';
import { DayWeatherModule } from '../day-weather/day-weather.module';

@NgModule({
  declarations: [ForecastComponent],
  imports: [
    NgChartsModule,
    CommonModule,
    ForecastRoutingModule,
    SharedModule,
    DayWeatherModule,
  ],
})
export class ForecastModule {}
