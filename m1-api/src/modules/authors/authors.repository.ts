// src/modules/authors/authors.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';

@Injectable()
export class AuthorsRepository {
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.repository.create(createAuthorDto);
    return await this.repository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Author | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<void> {
    await this.repository.update(id, updateAuthorDto);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
