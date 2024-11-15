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
import { BookPresenter } from './presenters/book.presenter'; // Importe le BookPresenter
import { Book } from './entities/book.entity'; // Importe le type Book

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll(): Promise<BookPresenter[]> {
    return this.booksService.findAll(); // Appel de la méthode findAll() du service
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Get('author/:authorId')
  async getBooksByAuthor(
    @Param('authorId') authorId: string, // Paramètre de l'ID de l'auteur
  ): Promise<Book[]> {
    return this.booksService.getBooksByAuthor(authorId); // Appel du service pour récupérer les livres par auteur
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<BookPresenter> {
    return this.booksService.create(createBookDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookPresenter> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.booksService.remove(id);
  }
}
