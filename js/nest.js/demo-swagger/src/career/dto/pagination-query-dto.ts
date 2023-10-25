import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationQueryDto {
 @ApiProperty()
 @IsOptional()
 readonly limit: number;

 @ApiProperty()
 @IsOptional()
 readonly offset: number;
}
