import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weather } from './entities/weather.entity';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[TypeOrmModule.forFeature([Weather]), ConfigModule.forRoot({ envFilePath: '.env' },), HttpModule
],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
