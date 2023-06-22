import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [SearchComponent, SearchBarComponent],
  imports: [CommonModule, SearchRoutingModule],
})
export class SearchModule {}
