import { Controller, Get, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import * as seed from './seed.json';

@Controller('api/cars')
export class CarsController {
  constructor(private service: CarsService){}

  @Get()
  async all(@Query('category') category?: string) {
    if (category) {
      return this.service.findByCategory(category);
    }
    return this.service.findAll();
  }

  @Post('seed')
  async seedData() {
    return this.service.createMany(seed);
  }
}
