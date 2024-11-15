// Importation des modules nécessaires pour les tests
import { Test, TestingModule } from '@nestjs/testing';  
import { INestApplication } from '@nestjs/common'; 
import * as request from 'supertest';  
import { AppModule } from '../src/app.module';  

describe('AuthorsController (e2e)', () => {  
  let app: INestApplication;  

  // Initialisation avant tous les tests (setup de l'application)
  beforeAll(async () => {
    // Création du module de test et compilation du module
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

  // Test pour la création d'un auteur via une requête POST
  it('/authors (POST)', () => {
    return request(app.getHttpServer())  // Envoi d'une requête HTTP POST à l'URL '/authors'
      .post('/authors')
      .send({
        name: 'John Doe',  // Nom de l'auteur
        photo: 'photo_url',  // URL de la photo de l'auteur
        biography: 'Biography text', 
      })
      .expect(201)  // Vérifie que le code de réponse HTTP est 201 (Création réussie)
      .then((response) => {
        // Vérification que la réponse contient bien les données envoyées
        expect(response.body.name).toBe('John Doe');
        expect(response.body.photo).toBe('photo_url');
        expect(response.body.biography).toBe('Biography text');
      });
  });

  // Test pour obtenir tous les auteurs via une requête GET
  it('/authors (GET)', () => {
    return request(app.getHttpServer())  // Envoi d'une requête HTTP GET à l'URL '/authors'
      .get('/authors')
      .expect(200)  // Vérifie que le code de réponse HTTP est 200 (Succès)
      .then((response) => {
        // Vérifie que la réponse est un tableau (liste des auteurs)
        expect(Array.isArray(response.body)).toBe(true);
      });
  });

  // Test pour obtenir un auteur spécifique par son ID via une requête GET
  it('/authors/:id (GET)', async () => {
    // Création d'un auteur avant de récupérer son ID
    const author = await request(app.getHttpServer()).post('/authors').send({
      name: 'Jane Doe',
      photo: 'photo_url_2',
      biography: 'Another biography',
    });

    // Envoi de la requête GET avec l'ID de l'auteur créé
    return request(app.getHttpServer())
      .get(`/authors/${author.body.id}`)
      .expect(200)  // Vérifie que le code de réponse est 200 (Succès)
      .then((response) => {
        // Vérifie que les données de l'auteur sont correctes
        expect(response.body.name).toBe('Jane Doe');
        expect(response.body.photo).toBe('photo_url_2');
        expect(response.body.biography).toBe('Another biography');
      });
  });

  // Test pour la mise à jour d'un auteur via une requête PUT
  it('/authors/:id (PUT)', async () => {
    // Création d'un auteur avant de le mettre à jour
    const author = await request(app.getHttpServer()).post('/authors').send({
      name: 'Initial Name',
      photo: 'initial_photo',
      biography: 'Initial biography',
    });

    // Envoi de la requête PUT pour mettre à jour le nom de l'auteur
    return request(app.getHttpServer())
      .put(`/authors/${author.body.id}`)
      .send({ name: 'Updated Name' })  // Mise à jour du nom
      .expect(200)  // Vérifie que le code de réponse est 200 (Succès)
      .then((response) => {
        // Vérifie que le nom a bien été mis à jour, mais que la photo reste inchangée
        expect(response.body.name).toBe('Updated Name');
        expect(response.body.photo).toBe('initial_photo');
      });
  });

  // Test pour la suppression d'un auteur via une requête DELETE
  it('/authors/:id (DELETE)', async () => {
    // Création d'un auteur avant de le supprimer
    const author = await request(app.getHttpServer()).post('/authors').send({
      name: 'Delete Me',
      photo: 'photo_to_delete',
      biography: 'Biography to delete',
    });

    // Envoi de la requête DELETE pour supprimer l'auteur
    return request(app.getHttpServer())
      .delete(`/authors/${author.body.id}`)
      .expect(200)  // Vérifie que le code de réponse est 200 (Succès)
      .then(() => {
        // Vérifie que l'auteur n'existe plus après la suppression en envoyant une requête GET
        return request(app.getHttpServer())
          .get(`/authors/${author.body.id}`)
          .expect(404);  // Vérifie que la réponse est une erreur 404 (Non trouvé)
      });
  });
});
