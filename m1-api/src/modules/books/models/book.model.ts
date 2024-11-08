// src/modules/books/models/book.model.ts
export class BookModel {
  id: number;
  title: string;
  publicationDate: string;
  price?: number;
  authorId: number;

  constructor(data: Partial<BookModel>) {
    this.id = data.id ?? 0;
    this.title = data.title ?? '';
    this.publicationDate = data.publicationDate ?? '';
    this.price = data.price;
    this.authorId = data.authorId ?? 0;
  }
}
