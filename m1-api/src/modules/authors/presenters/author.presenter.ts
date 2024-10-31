// src/modules/authors/presenters/author.presenter.ts
import { Author } from '../entities/author.entity';

export class AuthorPresenter {
  id: number;
  name: string;
  photo: string;
  biography: string;

  constructor(author: Author) {
    this.id = author.id;
    this.name = author.name;
    this.photo = author.photo;
    this.biography = author.biography;
  }
}
