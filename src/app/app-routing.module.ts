import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'forecast',
    loadChildren: () =>
      import('./components/forecast/forecast.module').then(
        (m) => m.ForecastModule
      ),
  },
  {
    path: 'favorite',
    loadChildren: () =>
      import('./components/favorite/favorite.module').then(
        (m) => m.FavoriteModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
