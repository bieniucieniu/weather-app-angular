import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
type Geocode = Record<string, number | string | [string, string]>;

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(private http: HttpClient) {}

  getLocation(str: string) {
    return this.http.get<Geocode>(
      `https://geocoding-api.open-meteo.com/v1/search?name=${str}&count=10&language=en&format=json`
    );
  }
}
