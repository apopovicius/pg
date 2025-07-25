import { IsString, IsNotEmpty } from 'class-validator;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
