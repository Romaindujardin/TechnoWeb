import { IsString, IsDateString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  publicationDate: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  authorId: number;
}
