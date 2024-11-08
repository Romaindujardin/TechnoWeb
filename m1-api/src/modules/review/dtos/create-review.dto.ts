// src/modules/review/dtos/Create-review.dto.ts
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsInt()
  bookId: number; // L'identifiant du livre auquel cet avis est associé
}
