import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[ConfigModule.forRoot({ envFilePath: '.env' }), TypeOrmModule.forFeature([Weather]), HttpModule
],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
