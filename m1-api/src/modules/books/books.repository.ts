import { EntityRepository, Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {
  // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire
}
