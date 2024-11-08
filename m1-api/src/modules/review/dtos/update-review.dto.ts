// src/modules/review/dtos/Update-review.dto.ts
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  stars?: number;

  @IsString()
  @IsOptional()
  comment?: string;
}
