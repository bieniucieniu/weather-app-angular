import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/app/shared.module';
import { WeatherChartComponent } from './weather-chart.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [WeatherChartComponent],
  exports: [WeatherChartComponent],

  imports: [CommonModule, SharedModule, NgChartsModule],
})
export class WeatherChartModule {}
