import { IsString, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDateString()
    publicationDate: string;

    @IsOptional()
    price?: number;

    @IsNotEmpty()
    authorId: number;
}
