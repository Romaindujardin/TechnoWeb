import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthorsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/authors (POST)', () => {
    return request(app.getHttpServer())
      .post('/authors')
      .send({
        name: 'John Doe',
        photo: 'photo_url',
        biography: 'Biography text',
      })
      .expect(201)
      .then((response) => {
        expect(response.body.name).toBe('John Doe');
        expect(response.body.photo).toBe('photo_url');
        expect(response.body.biography).toBe('Biography text');
      });
  });

  it('/authors (GET)', () => {
    return request(app.getHttpServer())
      .get('/authors')
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  it('/authors/:id (GET)', async () => {
    const author = await request(app.getHttpServer()).post('/authors').send({
      name: 'Jane Doe',
      photo: 'photo_url_2',
      biography: 'Another biography',
    });

    return request(app.getHttpServer())
      .get(`/authors/${author.body.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe('Jane Doe');
        expect(response.body.photo).toBe('photo_url_2');
        expect(response.body.biography).toBe('Another biography');
      });
  });

  it('/authors/:id (PUT)', async () => {
    const author = await request(app.getHttpServer()).post('/authors').send({
      name: 'Initial Name',
      photo: 'initial_photo',
      biography: 'Initial biography',
    });

    return request(app.getHttpServer())
      .put(`/authors/${author.body.id}`)
      .send({ name: 'Updated Name' })
      .expect(200)
      .then((response) => {
        expect(response.body.name).toBe('Updated Name');
        expect(response.body.photo).toBe('initial_photo');
      });
  });

  it('/authors/:id (DELETE)', async () => {
    const author = await request(app.getHttpServer()).post('/authors').send({
      name: 'Delete Me',
      photo: 'photo_to_delete',
      biography: 'Biography to delete',
    });

    return request(app.getHttpServer())
      .delete(`/authors/${author.body.id}`)
      .expect(200)
      .then(() => {
        return request(app.getHttpServer())
          .get(`/authors/${author.body.id}`)
          .expect(404);
      });
  });
});
