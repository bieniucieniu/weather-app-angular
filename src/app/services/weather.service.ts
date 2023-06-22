import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export type WeatherProps = {
  latitude: number;
  longitude: number;
  forecastDays?: number;
};
export type Weather =
  | ({
      hourly: {
        time: number[];
        temperature_2m: number[];
      };
      current_weather: {
        time: number;
        temperature: number;
        weathercode: number;
        windspeed: number;
        winddirection: number;
      };
    } & Record<string, number | string>)
  | {};

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  getWeather(props: WeatherProps) {
    return this.http.get<Weather>(
      `https://api.open-meteo.com/v1/forecast?latitude=${
        props.latitude
      }&longitude=${props.longitude}&hourly=temperature_2m&forecast_days=${
        props.forecastDays
          ? props.forecastDays > 16
            ? 16
            : props.forecastDays
          : 7
      }&timeformat=unixtime&current_weather=true`
    );
  }
}
