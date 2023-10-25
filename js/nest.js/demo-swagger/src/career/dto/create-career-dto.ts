import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCareerDto {
  @ApiProperty({
   example: 'company-name',
   required: true
  })
  @IsString()
  readonly company: string;

  @ApiProperty({
   example: 'dev, tester',
   required: true
  })
  @IsString()
  readonly role: string;

  @ApiProperty({
   example: '2021',
   required: true,
   description: 'this is the starting year of employement'
  })
  @IsNumber()
  readonly year: number;

  @ApiProperty({
   example: '5',
   required: true,
   description: 'number of years spend on this company'
  })
  @IsNumber()
  readonly duration: number;

  @ApiProperty({
    example: '["C++", "java", "swift"]',
    required: true,
    description: 'this is a list of skills'
  })  
  @IsString({each: true})
  readonly skills: string[];
}
