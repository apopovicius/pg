import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  //   @Get()
  //   findAll(@Res() response) {
  //     response.status(200).send('this action return all coffees');
  //   }
  //   @Get()
  //   findAll(@Query() paginationQuery) {
  //     const { limit, offset } = paginationQuery;
  //     return `This action returns all coffees. Limit ${limit}, offset: ${offset}`;
  //   }

  //   @Get('flavors')
  //   findAllFlavors() {
  //     return 'this action return all coffee flavors';
  //   }

  //   @Get(':id')
  //   findOne(@Param() params) {
  //     return `this actions returns #${params.id} coffee`;
  //   }
  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return `this actions returns #${id} coffee`;
  //   }

  //   @Post()
  //   create(@Body() body) {
  //     return body;
  //   }
  //   @Post()
  //   @HttpCode(HttpStatus.GONE)
  //   create(@Body('name') name: string) {
  //     return name;
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() body) {
  //     return `this action updates #${id} coffees with: ${body.name}`;
  //   }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto); // false
    this.coffeesService.create(createCoffeeDto);
    return createCoffeeDto;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
