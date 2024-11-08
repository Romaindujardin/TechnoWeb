// src/modules/books/books.service.ts
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './entities/book.entity';
import { BookPresenter } from './presenters/book.presenter';
import { BookModel } from './models/book.model'; // Importez BookModel
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<BookPresenter[]> {
    const books = await this.bookRepository.find();
    return books.map((book) => new BookPresenter(book));
  }

  async create(createBookDto: CreateBookDto): Promise<BookPresenter> {
    const bookData = new BookModel(createBookDto); // Convertir en BookModel
    const book = this.bookRepository.create(bookData);
    await this.bookRepository.save(book);
    return new BookPresenter(book);
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookPresenter> {
    const bookData = new BookModel(updateBookDto); // Convertir en BookModel
    await this.bookRepository.update(id, bookData);
    const updatedBook = await this.bookRepository.findOne({ where: { id } });
    return new BookPresenter(updatedBook);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
