import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type GeocodeResult } from '@/app/services/geocoding.service';
import { StorageService } from '@/app/services/storage.service';

@Component({
  selector: 'app-search-item',
  styles: [
    `
      button.fav:hover {
        color: var(--text-color);
      }
      p {
        display: flex;
        flex-direction: row;
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

      button.fav {
        background-color: transparent;
        border: none;
        color: var(--dim-text-color);
        font-size: 1.5rem;
        padding: 0.5rem;
        margin-left: auto;
      }
      button.in-fav {
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        padding: 0.5rem;
        margin-left: auto;
        color: var(--yellow-color);
      }

      button.fav:hover {
        color: var(--text-color);
      }
      button.fav.in-fav:hover {
        color: var(--text-color);
      }
    `,
  ],
  template: `
    <p>
      <button class="dropdown-item" (click)="emitSelect()">
        {{ data['name'] }}
        <span class="text-dim">
          {{ data['admin1'] }} | {{ data['country'] }},
          {{ data['country_code'] }}
        </span>
      </button>
      <button [class]="inFav() ? 'in-fav' : 'fav'" (click)="emitFav()">
        &#9733;
      </button>
    </p>
  `,
})
export class SearchItemComponent {
  @Input() data: GeocodeResult = {};
  @Output() select = new EventEmitter();
  @Output() fav = new EventEmitter();

  constructor(private storage: StorageService) {}

  emitSelect() {
    this.select.emit();
  }
  emitFav() {
    this.fav.emit();
  }

  inFav() {
    return this.storage.getFavorite()?.reduce((acc, e) => {
      if (e.id === this.data['id']) {
        return true;
      }
      return acc;
    }, false);
  }
}
