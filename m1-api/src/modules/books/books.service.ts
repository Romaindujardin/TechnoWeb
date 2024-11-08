// src/modules/books/books.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookPresenter } from './presenters/book.presenter';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>, // Injecte Repository de TypeORM
  ) {}

  async findAll(): Promise<BookPresenter[]> {
    const books = await this.booksRepository.find(); // Utilisation de find() de TypeORM
    return books.map((book) => new BookPresenter(book)); // Retourner les livres dans le format attendu
  }
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<BookPresenter> {
    const book = this.booksRepository.create(createBookDto); // Création de l'entité Book
    await this.booksRepository.save(book); // Sauvegarde dans la base de données
    return new BookPresenter(book);
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookPresenter> {
    // Trouver l'entité avant mise à jour
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Appliquer les modifications
    Object.assign(book, updateBookDto);

    // Sauvegarder les changements
    const updatedBook = await this.booksRepository.save(book);
    return new BookPresenter(updatedBook);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id); // Suppression du livre
  }
}
