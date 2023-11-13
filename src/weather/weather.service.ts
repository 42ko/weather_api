import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Weather } from './entities/weather.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/types/types';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private readonly weatherRepository: Repository<Weather>,
    private httpService: HttpService
  ) {}

  async getWeather(city: string, user_id: number) {
    const time = new Date().getTime()
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await this.httpService.get(apiUrl).toPromise();

      const weather = await this.weatherRepository.save({
        user_id: user_id,
        action_time: time,
        request_result: response.status,
        temp_c: Math.round(response.data.main.temp),
      });

      return weather;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
