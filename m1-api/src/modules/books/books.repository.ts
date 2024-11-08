// src/modules/books/books.repository.ts

import { Repository, EntityRepository } from 'typeorm';
import { Book } from './entities/book.entity';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {
  async find(): Promise<Book[]> {
    return this.find();
  }

  async createBook(createBookDto: Partial<Book>): Promise<Book> {
    const book = this.create(createBookDto);
    return this.save(book);
  }

  async updateBook(id: number, updateBookDto: Partial<Book>): Promise<Book> {
    await this.update(id, updateBookDto);
    return this.findOne({ where: { id } });
  }

  async deleteBook(id: number): Promise<void> {
    await this.delete(id);
  }
}
