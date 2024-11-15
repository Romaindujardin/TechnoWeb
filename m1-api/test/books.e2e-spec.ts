import { Test, TestingModule } from '@nestjs/testing';  
import { AppModule } from '../src/app.module'; 
import { INestApplication } from '@nestjs/common'; 
import * as request from 'supertest';

describe('Books (e2e)', () => {  
  let app: INestApplication;  

  // Initialisation de l'application avant tous les tests
  beforeAll(async () => {
    // Création et compilation du module de test en important le module principal de l'application
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],  
    }).compile();

    // Création de l'application NestJS à partir du module compilé
    app = moduleFixture.createNestApplication();
    await app.init();  
  });

  // Test pour vérifier le comportement de la route GET /books (récupérer tous les livres)
  it('/books (GET)', () => {
    // Envoi de la requête GET 
    return request(app.getHttpServer())
      .get('/books')
      .expect(200);  
  });

  // Test pour vérifier le comportement de la route POST /books (ajouter un nouveau livre)
  it('/books (POST)', () => {
    // Envoi d'une requête POST pour créer un nouveau livre
    return request(app.getHttpServer())
      .post('/books')
      .send({ title: 'Test Book', publicationDate: '2024-10-29', authorId: 1 })  // Données envoyées pour le livre
      .expect(201); 
  });

  // Fermeture de l'application après tous les tests
  afterAll(async () => {
    await app.close();  
  });
});
