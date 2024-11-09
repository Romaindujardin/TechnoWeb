import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; // Ajuste le chemin selon ton projet
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Books (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/books (GET)', () => {
    return request(app.getHttpServer()).get('/books').expect(200);
  });

  it('/books (POST)', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({ title: 'Test Book', publicationDate: '2024-10-29', authorId: 1 })
      .expect(201);
  });

  // Ajoute d'autres tests pour PUT et DELETE...

  afterAll(async () => {
    await app.close();
  });
});
