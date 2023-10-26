import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Career } from './entity/career';

@Injectable()
export class CareerService {
  private careerList: Career[] = [];
  
  getAll() {
    const list = [...this.careerList];
    return list;
  }

  getOne(year: string) {
    const careerItem = this.careerList.find(e=> e.year === +year)
    if(!careerItem) 
      throw new HttpException("There is no item career for this year", HttpStatus.NOT_FOUND)
      //throw new NotFoundException("The")
    return careerItem;
  }

  createCareer(year: string, role: string, company: string, duration: number, skills: string[]) {
    const newCareerXP = new Career(role, company, duration, +year, skills);
    this.careerList.push(newCareerXP);
  }

  updateCareer(year: string, role: string, company: string, duration: number, skills: string[], updatedYear: string) {
    console.log(`year: ${year}, role: ${role}, company: ${company}, duration: ${duration}, skills: ${skills}, updatedYear: ${updatedYear}`);
    const existingItem = this.getOne(year);
    if(existingItem) {
      const updatedCareerItem = {...existingItem};
      if(role) updatedCareerItem.role = role;
      if(company) updatedCareerItem.company = company;
      if(duration) updatedCareerItem.duration = duration;
      if(updatedYear) updatedCareerItem.year = +updatedYear;
      if(skills) updatedCareerItem.skills = skills;
      const indexOf = this.careerList.findIndex(e => e.year === +year)
      this.careerList[indexOf] = updatedCareerItem
    }
  }

  removeCareer(year: string) {
    const existingItemIndex = this.careerList.findIndex(e=> e.year === +year);
    if(existingItemIndex >= 0) this.careerList.splice(existingItemIndex, 1);
  }
  
}
