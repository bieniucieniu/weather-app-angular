import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayWeatherComponent } from './day-weather.component';
import { share } from 'rxjs';
import { SharedModule } from '@/app/shared.module';

@NgModule({
  declarations: [DayWeatherComponent],
  exports: [DayWeatherComponent],

  imports: [CommonModule, SharedModule],
})
export class DayWeatherModule {}
