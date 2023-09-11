//import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

/* PaginationQueryDto */
export class PaginationQueryDto {
  // @Type(() => Number) -> automatically done by enableImplicitConversion: true,
  @IsOptional()
  @IsPositive()
  limit: number;

  //@Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;
}
