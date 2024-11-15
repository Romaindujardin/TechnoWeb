import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './modules/books/books.module';
import { DatabaseModule } from './modules/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './modules/authors/authors.module';
import { ReviewsModule } from './modules/review/reviews.module';
import { Book } from './modules/books/entities/book.entity'; // Import direct des entités
import { Author } from './modules/authors/entities/author.entity';
import { Review } from './modules/review/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db', // Chemin vers la base de données SQLite
      entities: [Book, Author, Review], // Import direct des entités
      synchronize: true,
    }),
    DatabaseModule,
    BooksModule,
    AuthorsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
