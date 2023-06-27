import { Injectable } from '@angular/core';
import { WeatherProps } from './weather.service';

type placesInfo = {
  name: string;
  id: number;
  latitude: number | string;
  longitude: number | string;
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
      for (let e of this.favorite) {
        if (e.id == value.id) return;
      }
    }
    this.favorite.push(value);
    localStorage.setItem('favorite', JSON.stringify(this.favorite));
  }

  public switchFavorite(value: placesInfo) {
    if (localStorage.getItem('favorite')) {
      this.favorite = JSON.parse(localStorage.getItem('favorite') as string);
      for (let e of this.favorite) {
        if (e.id == value.id) {
          this.favorite = this.favorite.filter((item) => item.id !== value.id);
          localStorage.setItem('favorite', JSON.stringify(this.favorite));
          return;
        }
      }
    }
    this.favorite.push(value);
    localStorage.setItem('favorite', JSON.stringify(this.favorite));
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

  public setLastSearch(value: WeatherProps) {
    localStorage.setItem('lastSearch', JSON.stringify(value));
  }

  public getLastSearch(): WeatherProps | undefined {
    if (localStorage.getItem('lastSearch')) {
      return JSON.parse(localStorage.getItem('lastSearch') as string);
    }
    return undefined;
  }
}
