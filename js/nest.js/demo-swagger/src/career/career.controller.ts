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
  Res,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CareerService } from "./career.service";
import { CreateCareerDto } from "./dto/create-career-dto";
import { UpdateCareerDto } from "./dto/update-career-dto";

@ApiTags("career")
@Controller("career")
export class CareerController {
  constructor(private readonly careerService: CareerService) {}
  @Get()
  findAll() {
    //return "Get all years of career";
    return this.careerService.findAll();
  }

  @Get(":year")
  findOne(@Param("year") year: string) {
    // return `Get career from ${year}`;
    return this.careerService.findOne(year);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created",
  })
  addExperience(@Body() body) {
    //return `adding experience to career ${body.role}@${body.company} from ${body.year}`;
    this.careerService.addExperiance(body.year, body.role, body.company, body.duration, body.skills);
  }

  @Post('dto')
  addExperienceDto(@Body() createCareerDto: CreateCareerDto) {
    this.careerService.addExperienceDto(createCareerDto);
  }


  @Patch(":year")
  updateExperience(
  @Param("year") year: string, 
  @Body("role") role: string,
  @Body("company") company: string,
  @Body("duration") duration: number,
  @Body("year") newYear: number,
  @Body("skills") skills: string[] ) {
  //   return `updating the experience for year: ${year}`;
    return this.careerService.updateExperience(year, role, company, duration, newYear, skills);
  }
  
  @Patch("dto/:year")
  updateExperienceDto(@Param('year') year: string, @Body() updateCareerDto: UpdateCareerDto) {
     return this.careerService.updateExperienceDto(year, updateCareerDto);
  }

  @Delete(":year")
  //@HttpCode(HttpStatus.NO_CONTENT)
  //@ApiResponse({ status: 204, description: 'The record has been successfully deleted.'})
  removeExperience(@Param("year") year: string/*, @Res() res*/) {
    //return res.send(`removing experience for year: ${year}`);
    this.careerService.removeExperience(year);
    return null;
  }
}
