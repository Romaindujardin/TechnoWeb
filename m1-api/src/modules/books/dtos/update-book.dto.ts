import { IsString, IsDateString, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsDateString()
  @IsOptional()
  publicationDate?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  authorId: number;
}
