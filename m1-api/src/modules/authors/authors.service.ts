// src/modules/authors/authors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';
import { AuthorPresenter } from './presenters/author.presenter';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { CreateAuthorDto } from './dtos/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorsRepository: AuthorsRepository) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorPresenter> {
    const author = await this.authorsRepository.create(createAuthorDto);
    return new AuthorPresenter(author);
  }

  async findAll(): Promise<AuthorPresenter[]> {
    const authors = await this.authorsRepository.findAll();
    return authors.map((author) => new AuthorPresenter(author));
  }

  async findOne(id: number): Promise<AuthorPresenter> {
    const author = await this.authorsRepository.findOne(id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return new AuthorPresenter(author);
  }

  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorPresenter> {
    await this.authorsRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
