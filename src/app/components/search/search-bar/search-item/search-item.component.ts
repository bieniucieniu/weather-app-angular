import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type GeocodeResult } from '@/app/services/geocoding.service';

@Component({
  selector: 'app-search-item',
  styles: [
    `
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
      button.fav:hover {
        color: var(--text-color);
      }
    `,
  ],
  template: `
    <p>
      <button class="dropdown-item" (click)="emit()">
        {{ data['name'] }}
        <span class="text-dim">
          {{ data['admin1'] }} | {{ data['country'] }},
          {{ data['country_code'] }}
        </span>
      </button>
      <button class="fav">&#9733;</button>
    </p>
  `,
})
export class SearchItemComponent {
  @Input() data: GeocodeResult = {};
  @Output() click = new EventEmitter();

  emit() {
    this.click.emit();
  }
}
