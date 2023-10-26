import { Controller, Delete, Get, Param, Patch, Post, Body } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Get()
  getAll(/*@Query() pagination*/) {
    return this.careerService.getAll();
  }

  @Get(':year')
  getOne(@Param('year') year: string) {
    return this.careerService.getOne(year);
  }

  @Post()
  createCareer(@Body() body) {
    return this.careerService.createCareer(body.year,body.role, body.company, body.duration, body.skills);
  }


  @Patch(':year')
  updateCareer(
    @Param('year') year: string,
    @Body() body
  ) {
    return this.careerService.updateCareer(year, body.role, body.company, body.duration, body.skills, body.year);
  }

  @Delete(':year')
  removeCareer(@Param() param: any) {
    return this.careerService.removeCareer(param.year);
  }
  

}
