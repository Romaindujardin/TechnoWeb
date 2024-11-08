import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from './entities/book.entity';
import { BookPresenter } from './presenters/book.presenter'; // Importez BookPresenter
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<BookPresenter[]> {
    const books = await this.bookRepository.find();
    return books.map((book) => new BookPresenter(book)); // Convertir Book en BookPresenter
  }

  async create(createBookDto: CreateBookDto): Promise<BookPresenter> {
    const book = this.bookRepository.create(createBookDto);
    await this.bookRepository.save(book);
    return new BookPresenter(book); // Convertir Book en BookPresenter
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<BookPresenter> {
    await this.bookRepository.update(id, updateBookDto);
    const updatedBook = await this.bookRepository.findOne({ where: { id } });
    return new BookPresenter(updatedBook); // Convertir Book en BookPresenter
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
