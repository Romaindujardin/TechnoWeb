// Importation des modules nécessaires pour le test
import { Test, TestingModule } from '@nestjs/testing';  
import { INestApplication } from '@nestjs/common';  
import * as request from 'supertest';  
import { AppModule } from './../src/app.module';  

describe('AppController (e2e)', () => {  // Définition du test pour l'AppController avec un test end-to-end (e2e)
  let app: INestApplication;  
  // Fonction beforeEach pour initialiser l'application avant chaque test
  beforeEach(async () => {
    
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],  // Module principal à tester
    }).compile();

    // Création de l'application NestJS à partir du module de test compilé
    app = moduleFixture.createNestApplication();
    await app.init();  
  });

  // Test de la route GET "/"
  it('/ (GET)', () => {
    return request(app.getHttpServer())  // Effectue une requête HTTP GET vers le serveur de l'application
      .get('/')  // L'URL à tester
      .expect(200)  // Vérifie que la réponse a un statut HTTP 200
      .expect('Hello World!');  
  });
});
