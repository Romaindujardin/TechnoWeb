// ici on vient definir ce que represente un livre
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
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

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  // Ajout de la relation avec Review
  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
