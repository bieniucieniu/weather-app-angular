import { WeatherProps, WeatherService } from '@/app/services/weather.service';
import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-weather-chart',
  template: ` <canvas baseChart [data]="chartData" [type]="'line'"> </canvas> `,
  styles: [],
})
export class WeatherChartComponent {
  constructor(private weather: WeatherService) {}

  @Input() params: WeatherProps = {
    latitude: 0,
    longitude: 0,
  };
  @Input() className: string = '';
  @Input() forcast?: { start?: Date; end: Date };

  chartData?: ChartData;

  ngOnInit() {
    if (this.forcast) {
    } else {
      this.weather.getDay(this.params).subscribe((data) => {
        this.chartData = {
          labels: data.hourly.time.map(
            (time) => new Date(time * 1000).getHours() + ':00'
          ),
          datasets: [
            {
              data: data.hourly.temperature_2m,
              label: 'Temperature',
              tension: 0.5,
              fill: true,
              backgroundColor: '#EC6E4C',
              borderColor: '#306F8A',
            },
          ],
        };

        console.log(this.chartData);
      });
    }
  }
}
