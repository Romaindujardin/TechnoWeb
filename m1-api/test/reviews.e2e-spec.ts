import { Test, TestingModule } from '@nestjs/testing';  
import { AppModule } from '../src/app.module';  
import { INestApplication } from '@nestjs/common'; 
import * as request from 'supertest'; 

describe('Reviews (e2e)', () => {  
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

  // Fermeture de l'application après tous les tests
  afterAll(async () => {
    await app.close();  
  });

  // Test pour vérifier le comportement de la route GET /reviews (récupérer toutes les reviews)
  it('/reviews (GET)', async () => {
    // Envoi de la requête GET pour récupérer toutes les reviews
    const response = await request(app.getHttpServer())
      .get('/reviews')
      .expect(200);  

    // Vérifie que la réponse est bien un tableau d'objets
    expect(Array.isArray(response.body)).toBe(true);
    // Vérifie que la réponse contient au moins 0 éléments (les reviews peuvent être vides au départ)
    expect(response.body.length).toBeGreaterThanOrEqual(0); 
  });

  // Test pour vérifier le comportement de la route POST /reviews (ajouter une nouvelle review)
  it('/reviews (POST)', () => {
    // Envoi d'une requête POST
    return request(app.getHttpServer())
      .post('/reviews')
      .send({
        comment: 'Great Book',  // Commentaire pour la review
        stars: 5, 
        bookId: 1, 
      })
      .expect(201);  
  });
});
