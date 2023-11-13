import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';


@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get(':city')
  @UseGuards(JwtAuthGuard)
  getWeather(@Param('city') city: string, @Req() req) {
    return this.weatherService.getWeather(city, req.user.id);
  }
}
