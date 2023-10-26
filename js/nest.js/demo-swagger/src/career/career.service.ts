import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { Career } from './entity/career';
import { CreateCareerDto } from './dto/create-career-dto';
import { UpdateCareerDto } from './dto/update-career-dto';
import { PaginationQueryDto } from './dto/pagination-query-dto';

@Injectable()
export class CareerService {
  private careerList: Career[] = [];

  private giveMeListPaginated(limit: number, offset: number) {
    let list = [...this.careerList];
    list.splice(0, offset);
    let final = []
    for(let i=0;i<limit; i++)
    {
      if(i >= list.length)
        break;
      final.push(list[i]);
    }
    return final;
  }

  findAll(paginationQuery: PaginationQueryDto) {
    let careerList = [...this.careerList];
    console.log(paginationQuery);
    if(Object.keys(paginationQuery).length) {
      const {limit, offset} = paginationQuery;
      careerList = this.giveMeListPaginated(limit, offset);
    }
    return careerList;
  }

  findOne(year: string) {
    const careerItem = this.careerList.find( e => e.year === +year );
    if(!careerItem)
      throw new HttpException(`There is no career item for the year ${year}`, HttpStatus.NOT_FOUND);
    return careerItem;
  }

  addExperiencence(year: string, role: string, company: string, duration: number, skills: string[]) {
    const newCareerXP = new Career(role, company, duration, +year, skills);
    this.careerList.push(newCareerXP);
  }

  addExperienceDto(createCareerDto: CreateCareerDto) {
    //console.log(createCareerDto)
    const {role, company, duration, year, skills} = createCareerDto;
    const newYear = +year + this.careerList.length;
    const newCareerXP = new Career(role, company, duration, newYear, skills);
    this.careerList.push(newCareerXP);
  }

  updateExperience(year: string, role: string, company: string, duration: number, newYear: number, skills: string[]) {
    const existing = this.findOne(year);
    if(existing) {
      const updatedCareer = {...existing};
      if(role) updatedCareer.role = role;
      if(company) updatedCareer.company = role;
      if(duration) updatedCareer.duration = duration;
      if(skills) updatedCareer.skills = skills;
      if(newYear) updatedCareer.year = newYear;

      const indexOf = this.careerList.findIndex(e => e.year === +year);
      this.careerList[indexOf] = updatedCareer;
    }
  }

  updateExperienceDto(yearToUpdate: string, updateCareerDto: UpdateCareerDto) {
    const existing = this.findOne(yearToUpdate);
    if(existing) {
      const updatedCareer = {...existing};
      const {role, company, duration, skills, year} = updateCareerDto;
      if(role) updatedCareer.role = role;
      if(company) updatedCareer.company = role;
      if(duration) updatedCareer.duration = duration;
      if(skills) updatedCareer.skills = skills;
      if(year) updatedCareer.year = year;

      const indexOf = this.careerList.findIndex(e => e.year === +yearToUpdate);
      this.careerList[indexOf] = updatedCareer;
    }
  }


  removeExperience(year: string) {
    const existingIndex = this.careerList.findIndex(e => e.year === +year);
    if(existingIndex >= 0) {
      console.log('found one')
      this.careerList.splice(existingIndex, 1);
    }
  }
}
