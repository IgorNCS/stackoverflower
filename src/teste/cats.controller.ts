import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() cat: Cat): Promise<Cat> {
    return this.catsService.create(cat);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('teste')
  async findAlla(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
