// modules/authors/authors.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { AuthorPresenter } from './presenters/author.presenter'; // Importez AuthorPresenter

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorPresenter> {
    return this.authorsService.create(createAuthorDto); // Le service retourne déjà AuthorPresenter
  }

  @Get()
  async findAll(): Promise<AuthorPresenter[]> {
    return this.authorsService.findAll(); // Le service retourne déjà AuthorPresenter[]
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AuthorPresenter> {
    return this.authorsService.findOne(+id); // Le service retourne déjà AuthorPresenter
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorPresenter> {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.authorsService.remove(+id);
  }
}
