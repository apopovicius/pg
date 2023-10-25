import { IsNumber, IsString } from "class-validator";

export class CreateCareerDto {
  @IsString()
  readonly company: string;

  @IsString()
  readonly role: string;

  @IsNumber()
  readonly year: number;

  @IsNumber()
  readonly duration: number;

  @IsString({each: true})
  readonly skills: string[];
}
