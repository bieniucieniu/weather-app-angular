import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  GeocodingService,
  type GeocodeResult,
} from '@/app/services/geocoding.service';
import { Subscription } from 'rxjs';
import { StorageService } from '@/app/services/storage.service';
@Component({
  selector: 'app-search-bar',
  styles: [
    `
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type='number'] {
        -moz-appearance: textfield;
      }
      @keyframes slide-down {
        0% {
          opacity: 0;
          transform: translateY(-20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      div.wraper {
        position: relative;
        box-shadow: var(--shadow);
        padding: 0.7rem;
        margin: 1rem;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
      }
      div.dropdown {
        position: absolute;
        left: 0;
        top: calc(100% + 0.3rem);
        width: 100%;
        max-width: 100%;
        background-color: var(--background-color);
        color: var(--text-color);
        box-shadow: var(--shadow);
        z-index: 10;
        animation-duration: 0.6s;
        padding: 1rem;
        border-radius: 1rem;
        animation: slide-down 0.2s ease-in-out;
      }
      input.search {
        color: var(--text-color);
        border: none;
        border-radius: 7px;
        font-size: 1rem;
        line-height: 1.5rem;
        padding: 0.1rem 1rem;
        transition: box-shadow 0.1s ease-in-out,
          background-color 0.1s ease-in-out;
        box-shadow: var(--shadow);
        background-color: var(--dim-color);
      }
      input.search:focus {
        outline: none;
        box-shadow: var(--dark-shadow);
        background-color: var(--dark-dim-color);
      }
      .slide {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
        color: var(--text-color);
        visibility: hidden;
      }
      .number {
        outline: none;
        border: none;
        text-align: center;
        box-shadow: var(--shadow);
        background-color: var(--dim-color);
        transition: box-shadow 0.1s ease-in-out,
          background-color 0.1s ease-in-out;
      }

      .number:focus {
        box-shadow: var(--dark-shadow);
        background-color: var(--dark-dim-color);
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
    `,
  ],
  template: `
    <div class="wraper">
      <input
        class="search"
        type="text"
        placeholder="search"
        [(ngModel)]="inputValue"
        (keyup)="onInputChange()"
      />

      <div class="slide">
        <label for="forcastSlide">forcast:</label>
        <span>
          <input
            class="number"
            type="number"
            name="forcastSlide"
            min="1"
            max="16"
            [(ngModel)]="forcastValue"
          />
          days
        </span>
        <input
          class="range"
          type="range"
          name="forcastSlide"
          min="1"
          max="16"
          [(ngModel)]="forcastValue"
        />
      </div>

      <div *ngIf="inputValue.length > 0" class="dropdown">
        <ul *ngIf="geocodingData.length > 0; else noResults">
          <li *ngFor="let data of geocodingData">
            <app-search-item
              [data]="data"
              (select)="onPlaceSelect(data)"
              (fav)="onFav(data)"
            ></app-search-item>
          </li>
        </ul>

        <ng-template #noResults>
          <span> nothing like that... </span>
        </ng-template>
      </div>
    </div>
  `,
})
export class SearchBarComponent {
  constructor(
    private geocoding: GeocodingService,
    private router: Router,
    private storage: StorageService
  ) {}

  inputValue: string = '';
  forcastValue: number = 7;
  geocodingData: GeocodeResult[] = [];
  radioValue = false;
  geoSub: Subscription = new Subscription(null!);
  onInputChange() {
    if (!this.geoSub.closed) this.geoSub.unsubscribe();
    this.geoSub = this.geocoding
      .getLocation(this.inputValue)
      .subscribe((data) => {
        this.geocodingData = data.results ? data.results : [];
      });
  }
  onPlaceSelect(place: GeocodeResult) {
    this.geocodingData = [];
    this.storage.setLastSearch({
      latitude: place['latitude'] as number,
      longitude: place['longitude'] as number,
      name: place['name'] as string,
    });
    this.router.navigate(['/forecast'], {
      queryParams: {
        latitude: place['latitude'],
        longitude: place['longitude'],
        // forecastDays: this.forcastValue,
        current: true,
        name: place['name'],
      },
    });
  }
  onFav(place: GeocodeResult) {
    this.storage.switchFavorite({
      latitude: place['latitude'] as number,
      longitude: place['longitude'] as number,
      name: place['name'] as string,
      id: place['id'] as number,
    });
    console.log(this.storage.getFavorite());
  }
}
