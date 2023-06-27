import { Injectable } from '@angular/core';

type placesInfo = {
  name: string;
  latitude: number;
  longitude: number;
};
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  favorite: placesInfo[] = [];
  public addToFavorite(value: placesInfo) {
    if (localStorage.getItem('favorite')) {
      this.favorite = JSON.parse(localStorage.getItem('favorite') as string);
      this.favorite.push(value);
      localStorage.setItem('favorite', JSON.stringify(this.favorite));
    }
  }

  public getFavorite() {
    if (localStorage.getItem('favorite')) {
      return JSON.parse(localStorage.getItem('favorite') as string);
    }
  }

  public removeFromFavorite(value: placesInfo) {
    if (localStorage.getItem('favorite')) {
      this.favorite = JSON.parse(localStorage.getItem('favorite') as string);
      this.favorite = this.favorite.filter((item) => item.name !== value.name);
      localStorage.setItem('favorite', JSON.stringify(this.favorite));
    }
  }

  public setLastSearch(value: placesInfo) {
    localStorage.setItem('lastSearch', JSON.stringify(value));
  }

  public getLastSearch() {
    if (localStorage.getItem('lastSearch')) {
      return JSON.parse(localStorage.getItem('lastSearch') as string);
    }
  }
}
