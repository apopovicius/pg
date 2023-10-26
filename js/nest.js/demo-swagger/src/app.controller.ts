import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CareerService } from './career/career.service';
import { PaginationQueryDto } from './career/dto/pagination-query-dto';

@Controller()
export class AppController {
  constructor(
    private readonly careerService: CareerService,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): any {
    const pagination: PaginationQueryDto = {
      limit: 100,
      offset: 0
    };
    return this.careerService.findAll(pagination);
  }
}
