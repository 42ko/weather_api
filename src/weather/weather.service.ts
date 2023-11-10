// weather.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';


@Injectable()
export class WeatherService {
  private readonly apiKey: string;

  constructor(private readonly httpService: HttpService) {}

  async getWeather(city: string) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2364e877b5c55795739830e641b2de3e`;

    try {
      const response = await this.httpService.get(apiUrl).toPromise();
      return response.data;
    } catch (error) {
      console.error(
        'Error calling OpenWeather API:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
