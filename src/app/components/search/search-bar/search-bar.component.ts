import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  GeocodingService,
  type GeocodeResult,
} from '@/app/services/geocoding.service';
import { Subscription } from 'rxjs';
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
      form.wraper {
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
      button.dropdown-item {
        background-color: transparent;
        border: none;
        width: 100%;
        text-align: left;
        padding: 1rem;
        border-radius: 0.5rem;
      }
      button.dropdown-item:hover {
        background-color: var(--dark-dim-color);
        box-shadow: var(--dark-shadow);
      }
      .text-dim {
        color: var(--dim-text-color);
      }
    `,
  ],
  template: `
    <form class="wraper">
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
            <button class="dropdown-item" (click)="onPlaceSelect(data)">
              {{ data['name'] }}
              <span class="text-dim">
                {{ data['admin1'] }} | {{ data['country'] }},
                {{ data['country_code'] }}
              </span>
            </button>
          </li>
        </ul>

        <ng-template #noResults>
          <span> nothing like that... </span>
        </ng-template>
      </div>
    </form>
  `,
})
export class SearchBarComponent {
  constructor(
    private geocoding: GeocodingService,
    private router: Router,
    private geoSub: Subscription
  ) {}

  inputValue: string = '';
  forcastValue: number = 7;
  geocodingData: GeocodeResult[] = [];
  radioValue = false;
  onInputChange() {
    if (this.geoSub) this.geoSub.unsubscribe();
    this.geoSub = this.geocoding
      .getLocation(this.inputValue)
      .subscribe((data) => {
        this.geocodingData = data.results ? data.results : [];
        console.log(data);
      });
  }
  onPlaceSelect(place: GeocodeResult) {
    this.geocodingData = [];
    this.router.navigate(['/forecast'], {
      queryParams: {
        latitude: place['latitude'],
        longitude: place['longitude'],
        forecastDays: this.forcastValue,
      },
    });
  }
}
