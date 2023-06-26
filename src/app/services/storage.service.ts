import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public save(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public get(key: string) {
    return localStorage.getItem(key);
  }
  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public clearAll() {
    localStorage.clear();
  }
}
