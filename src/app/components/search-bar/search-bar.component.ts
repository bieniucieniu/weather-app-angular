import { Component } from '@angular/core';
import {
  GeocodingService,
  type GeocodeResult,
} from '@/app/services/geocoding.service';
@Component({
  selector: 'app-search-bar',
  styles: [
    `
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
        flex-direction: row;
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
      input {
        color: var(--text-color);
        border: none;
        border-radius: 7px;
        font-size: 1rem;
        line-height: 1.5rem;
        padding: 0.1rem 1rem;
        transition: box-shadow 0.1s ease-in-out,
          background-color 0.1s ease-in-out;
      }
      input:focus {
        outline: none;
        box-shadow: var(--shadow);
        background-color: var(--dim-color);
      }
      button {
        width: 2rem;
        height: 2rem;
        border-radius: 7px;
        outline: none;
        border: none;
        background: none;
        transition: box-shadow 0.1s ease-in-out,
          background-color 0.1s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      button:hover {
        box-shadow: var(--shadow);
        background-color: var(--dim-color);
      }
    `,
  ],
  template: `
    <div class="wraper">
      <input type="text" placeholder="search" (keyup)="onInputChange($event)" />
      <button (click)="onClick()">
        <img src="assets/search.svg" />
      </button>
      <div *ngIf="inputValue.length > 0" class="dropdown">
        <ul *ngIf="geocodingData.length > 0; else noResults">
          <li *ngFor="let data of geocodingData">
            {{ data['name'] }} <span>{{ data['country'] }}</span>
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
  constructor(private geocoding: GeocodingService) {}

  inputValue: string = '';
  geocodingData: GeocodeResult[] = [];

  onInputChange(event: KeyboardEvent) {
    this.inputValue = (event.target as HTMLInputElement).value;
    this.geocoding.getLocation(this.inputValue).subscribe((data) => {
      this.geocodingData = data.results ? data.results : [];
      console.log(data);
    });
  }
  onClick() {}
}
