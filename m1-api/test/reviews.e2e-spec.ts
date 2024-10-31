import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module'; // Assurez-vous que ce chemin est correct
import { INestApplication } from '@nestjs/common'; // Changez ici
import * as request from 'supertest';

describe('Reviews (e2e)', () => {
  let app: INestApplication; // Utilisez INestApplication ici

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Assurez-vous que votre module principal est importé
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/reviews (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/reviews')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(0); // Accepter une réponse vide ou non vide
  });

  it('/reviews (POST)', () => {
    return request(app.getHttpServer())
      .post('/reviews')
      .send({
        comment: 'Great Book',
        stars: 5,
        bookId: 1,
      })
      .expect(201); // Vérifiez le code de statut approprié
  });
});
