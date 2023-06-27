import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';
import { SharedModule } from '@/app/shared.module';
import { DayWeatherModule } from '../day-weather/day-weather.module';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    SharedModule,
    DayWeatherModule,
  ],
})
export class FavoriteModule {}
