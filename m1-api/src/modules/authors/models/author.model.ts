// src/modules/authors/models/author.model.ts
export class AuthorModel {
  id: number;
  name: string;
  photo?: string;
  biography?: string;

  constructor(data: Partial<AuthorModel>) {
    this.id = data.id ?? 0; // Valeur par défaut si non fourni
    this.name = data.name ?? '';
    this.photo = data.photo;
    this.biography = data.biography;
  }
}
