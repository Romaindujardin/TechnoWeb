// src/modules/books/books.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookPresenter } from './presenters/book.presenter';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async findAll(): Promise<BookPresenter[]> {
    const books = await this.booksRepository.findAllBooks();
    return books.map((book) => new BookPresenter(book));
  }

  async create(createBookDto: CreateBookDto): Promise<BookPresenter> {
    const book = await this.booksRepository.createBook(createBookDto);
    return new BookPresenter(book);
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookPresenter> {
    const updatedBook = await this.booksRepository.updateBook(
      id,
      updateBookDto,
    );
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return new BookPresenter(updatedBook);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.deleteBook(id);
  }
}
