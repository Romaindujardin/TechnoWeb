import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './modules/books/books.module';
import { DatabaseModule } from './modules/database/database.module'; // Votre module de base de données
import { AppController } from './app.controller'; // Assurez-vous que le bon contrôleur est importé
import { AppService } from './app.service'; // Assurez-vous que le bon contrôleur est importé


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db', // Chemin vers votre base de données SQLite
      entities: [__dirname + '/modules/**/*.entity{.ts,.js}'], // Inclut toutes les entités
      synchronize: true, // En développement, synchronisez automatiquement
    }),
    DatabaseModule,
    BooksModule,
    
  ],
  controllers: [AppController], // Ajoutez le contrôleur ici
  providers: [AppService],
})
export class AppModule {}
