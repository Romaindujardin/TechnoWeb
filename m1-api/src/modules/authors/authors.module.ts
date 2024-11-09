// src/modules/authors/authors.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { AuthorsRepository } from './authors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorsRepository],
})
export class AuthorsModule {}
