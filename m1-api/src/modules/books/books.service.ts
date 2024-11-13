import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { BookPresenter } from './presenters/book.presenter';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>, // Injection du Repository d'Author
  ) {}

  async findAll(): Promise<BookPresenter[]> {
    const books = await this.booksRepository.find();
    return books.map((book) => new BookPresenter(book));
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async create(createBookDto: CreateBookDto): Promise<BookPresenter> {
    // Charger l'auteur par ID
    const author = await this.authorsRepository.findOne({
      where: { id: createBookDto.authorId },
    });
    if (!author) {
      throw new NotFoundException(
        `Author with ID ${createBookDto.authorId} not found`,
      );
    }

    // Créer l'entité Book avec l'auteur associé
    const book = this.booksRepository.create({
      ...createBookDto,
      author, // Associer l'auteur
    });

    // Sauvegarder le livre dans la base de données
    await this.booksRepository.save(book);
    return new BookPresenter(book);
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookPresenter> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (updateBookDto.authorId) {
      const author = await this.authorsRepository.findOne({
        where: { id: updateBookDto.authorId },
      });
      if (!author) {
        throw new NotFoundException(
          `Author with ID ${updateBookDto.authorId} not found`,
        );
      }
      book.author = author; // Mettre à jour l'auteur
    }

    Object.assign(book, updateBookDto);
    const updatedBook = await this.booksRepository.save(book);
    return new BookPresenter(updatedBook);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  // Ajouter la méthode getBooksByAuthor
  async getBooksByAuthor(authorId: string): Promise<Book[]> {
    return this.booksRepository.find({
      where: { author: { id: Number(authorId) } }, // Filtrer les livres par l'ID de l'auteur
      relations: ['author'], // Assurer que la relation 'author' est bien incluse
    });
  }
}
