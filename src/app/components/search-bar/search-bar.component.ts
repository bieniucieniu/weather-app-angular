import { Component } from '@angular/core';
import {
  GeocodingService,
  type GeocodeResults,
} from '@/app/services/geocoding.service';
@Component({
  selector: 'app-search-bar',
  template: `
    <div>
      <input type="text" placeholder="search" (keyup)="onInputChange($event)" />
      <button (click)="onClick()">dasda</button>
    </div>
  `,
  styles: [],
})
export class SearchBarComponent {
  constructor(private geocoding: GeocodingService) {}
  inputValue: string = '';
  geocodingData: GeocodeResults = [];

  ngOnInit() {}
  onInputChange(event: KeyboardEvent) {
    this.inputValue = (event.target as HTMLInputElement).value;
    this.geocoding.getLocation(this.inputValue).subscribe((data) => {
      this.geocodingData = data.results;
      console.log(data);
    });
  }
  onClick() {}
}
