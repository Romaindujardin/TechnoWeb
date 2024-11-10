// src/modules/books/books.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity'; // Import Author si nécessaire
import { AuthorsModule } from '../authors/authors.module'; // Import du module AuthorsModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, BooksRepository, Author]), // Ajouter Author ici
    AuthorsModule, // Import du module contenant AuthorRepository
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService, TypeOrmModule],
})
export class BooksModule {}
