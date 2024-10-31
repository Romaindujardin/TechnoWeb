import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookPresenter } from './presenters/book.presenter'; // Importez le BookPresenter

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<BookPresenter[]> {
    // Spécifiez le type de retour
    return this.booksService.findAll();
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<BookPresenter> {
    // Spécifiez le type de retour
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookPresenter> {
    // Spécifiez le type de retour
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    // Spécifiez le type de retour
    return this.booksService.remove(id);
  }
}
