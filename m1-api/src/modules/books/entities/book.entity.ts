// ici on vient definir ce que represente un livre
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Review } from '../../review/entities/review.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'date' })
  publicationDate: string;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  author: Author;

  // Ajout de la relation avec Review
  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
