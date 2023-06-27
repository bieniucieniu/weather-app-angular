import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as WeatherDescriptions from '@/assets/weatherDescriptions.json';
import { DatePipe } from '@angular/common';
import da from 'date-fns/locale/da';
export type WeatherProps = {
  latitude: number | string;
  longitude: number | string;
  name?: string;
  current_weather?: boolean;
};

interface DayProps extends WeatherProps {
  date?: Date;
}
interface ForecastProps extends WeatherProps {
  date: {
    start?: Date;
    end: Date;
  };
}
export type Weather =
  | {
      hourly: {
        time: number[];
        temperature_2m: number[];
        precipitation_probability: number[];
        weathercode: (keyof typeof WeatherDescriptions)[];
      };
      current_weather: {
        temperature: number;
        weathercode: keyof typeof WeatherDescriptions;
        windspeed: number;
        winddirection: number;
      };
    } & Record<string, number | string>;

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient, private datePipe: DatePipe) {}
  private toFullDate(date: Date) {
    const str = this.datePipe.transform(date, 'yyyy-MM-dd');
    return str ? str : this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
  }

  getDay(params: DayProps) {
    const queryParams = {
      latitude: Number(params.latitude),
      longitude: Number(params.longitude),
      timeformat: 'unixtime',
      timezone: 'auto',
      hourly: ['temperature_2m', 'precipitation_probability', 'weathercode'],
      start_date: params.date
        ? this.toFullDate(params.date)
        : this.toFullDate(new Date()),
      end_date: params.date
        ? this.toFullDate(params.date)
        : this.toFullDate(new Date()),
      current_weather: params.current_weather ? true : false,
    };

    return this.http.get<Weather>(`https://api.open-meteo.com/v1/forecast`, {
      params: queryParams,
    });
  }
  getForecast(params: ForecastProps) {
    const queryParams = {
      latitude: Number(params.latitude),
      longitude: Number(params.longitude),
      timeformat: 'unixtime',
      timezone: 'auto',
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'weathercode',
      ],
      start_date: params.date.start
        ? this.toFullDate(params.date.start)
        : this.toFullDate(new Date()),
      end_date: this.toFullDate(params.date.end),
    };

    return this.http.get<Weather>(`https://api.open-meteo.com/v1/forecast`, {
      params: queryParams,
    });
  }

  getCurrentWeather(params: WeatherProps) {
    const queryParams = {
      latitude: Number(params.latitude),
      longitude: Number(params.longitude),
      timeformat: 'unixtime',
      timezone: 'auto',
      current_weather: true,
    };

    return this.http.get<Weather>(`https://api.open-meteo.com/v1/forecast`, {
      params: queryParams,
    });
  }

  getDescriptions(code: keyof typeof WeatherDescriptions, day: boolean = true) {
    return WeatherDescriptions[code][day ? 'day' : 'night'].description;
  }
  getImageUrl(code: keyof typeof WeatherDescriptions, day: boolean = true) {
    return WeatherDescriptions[code][day ? 'day' : 'night'].image;
  }
}
