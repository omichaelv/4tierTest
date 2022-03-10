import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from './shared/weather'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = '4tierTest';

  temp:       number = 0;
  temp_min:   number = 0;
  temp_max:   number = 0;
  humidity:   number = 0;
  wind: number = 0;


  constructor(public weatherApi: WeatherService) { }

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather() {
    return this.weatherApi.getWeather().subscribe((data: Weather) => {
      this.temp = data.main.temp;
      this.temp_max = data.main.temp_max;
      this.temp_min = data.main.temp_min;
      this.humidity = data.main.humidity;
      this.wind = data.wind.speed;
      console.log(this.temp)
    });
  }
}
