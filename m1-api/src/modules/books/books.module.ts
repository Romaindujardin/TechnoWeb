import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Author]), // Utilisation directe des entités Book et Author
    AuthorsModule, // Module des auteurs
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService, TypeOrmModule],
})
export class BooksModule {}
