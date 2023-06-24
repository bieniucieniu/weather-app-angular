import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { ForecastRoutingModule } from './forecast-routing.module';
import { ForecastComponent } from './forecast.component';

@NgModule({
  declarations: [ForecastComponent],
  imports: [NgChartsModule, CommonModule, ForecastRoutingModule],
})
export class ForecastModule {}
