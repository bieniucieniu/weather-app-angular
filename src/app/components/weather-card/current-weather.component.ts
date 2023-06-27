import { Component, Input } from '@angular/core';
import { type Weather, WeatherService } from '@/app/services/weather.service';
@Component({
  selector: 'app-current-weather',
  styles: [
    `
      .card {
        box-shadow: var(--shadow);
        color: var(--text-color);
        border-radius: 1rem;
        padding: 0.5rem 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        transform: rotate(--rotate);
        h3,
        h6 {
          margin: 0;
        }
      }
      .row {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
      }

      .arrow {
        width: 2rem;
        height: 2rem;
        transform: rotate(var(--rotate));
      }
      h5 {
        display: flex;
        align-items: center;
      }
    `,
  ],
  template: ` <div class="card">
    <div class="row">
      <h3>Current Weather</h3>
      <h6>{{ getDesc(data.weathercode) }}</h6>
      <img [src]="getUrl(data.weathercode)" alt="" />
    </div>
    <div class="row">
      <div class="column">
        <h1>{{ data.temperature }}°C</h1>
        <h5>
          <img
            src="assets/arrow.svg"
            class="arrow"
            alt="arrow"
            [style.--rotate.deg]="data.winddirection"
          />
          <span class="wind"> {{ data.windspeed }}m/s</span>
        </h5>
      </div>
    </div>
  </div>`,
})
export class CurrentWeatherComponent {
  constructor(private weatherService: WeatherService) {}

  @Input() data: Weather['current_weather'] = {
    temperature: 0,
    weathercode: '0',
    winddirection: 0,
    windspeed: 0,
  };
  getDesc(code: typeof this.data.weathercode) {
    return this.weatherService.getDescriptions(code);
  }
  getUrl(code: typeof this.data.weathercode) {
    return this.weatherService.getImageUrl(code);
  }

  ngOnInit() {}
}
