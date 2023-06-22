import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  {
    path: 'search',
    loadChildren: () =>
      import('./components/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'forecast',
    loadChildren: () =>
      import('./components/forecast/forecast.module').then(
        (m) => m.ForecastModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
