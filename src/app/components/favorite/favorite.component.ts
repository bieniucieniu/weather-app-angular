import { StorageService } from '@/app/services/storage.service';
import { type WeatherProps } from '@/app/services/weather.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-favorite',
  styles: [
    `
      div.wraper {
        color: var(--text-color);
        max-height: 70vh;
        overflow-y: auto;
        scrollbar-gutter: stable;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        display: flex;
        flex-direction: column;
        margin: 10px;
        gap: 0;
      }
      h1 {
        color: var(--header-text-color);
      }
      button {
        margin-top: 10px;
        border: none;
        border-radius: 5px;
        background-color: var(--dim-color);
        box-shadow: var(--shadow);
        transition: 0.1s;
      }

      button:hover {
        background-color: var(--dark-dim-color);
        box-shadow: var(--dark-shadow);
      }
    `,
  ],
  template: `
    <div class="wraper" *ngIf="favorite.length > 0; else elseBlock">
      <ul>
        <li *ngFor="let e of favorite">
          <app-day-weather [params]="e"></app-day-weather>
          <button (click)="removeFavorite(e)">remove from favorite</button>
        </li>
      </ul>
    </div>
    <ng-template #elseBlock>
      <h1>no favourite...</h1>
    </ng-template>
  `,
})
export class FavoriteComponent {
  constructor(private storage: StorageService) {}

  favorite: (WeatherProps & { id: number })[] = [];

  ngOnInit() {
    const e = this.storage.getFavorite();
    console.log(e);
    if (e) {
      this.favorite = e;
    }
  }
  removeFavorite(e: (typeof this.favorite)[0]) {
    this.storage.removeFromFavorite(e);
    this.favorite = this.storage.getFavorite()!;
  }
}
