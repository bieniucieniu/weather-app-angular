import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { SearchBarComponent } from './components/search/search-bar/search-bar.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchItemComponent } from './components/search/search-bar/search-item/search-item.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SearchComponent,
    SearchItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
