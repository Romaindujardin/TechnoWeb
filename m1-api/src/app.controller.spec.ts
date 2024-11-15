// Importation des modules nécessaires depuis le framework NestJS pour les tests
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Bloc de test pour le contrôleur AppController
describe('AppController', () => {
  let appController: AppController;

  // Avant chaque test, on initialise le module de test
  beforeEach(async () => {
    // Création d'un module de test avec AppController et AppService
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController], // Déclaration du contrôleur à tester
      providers: [AppService], // Injection du service nécessaire au contrôleur
    }).compile();

    // Récupération d'une instance du AppController pour les tests
    appController = app.get<AppController>(AppController);
  });

  // Sous-bloc de test pour la méthode `getHello` du contrôleur
  describe('root', () => {
    // Test vérifiant que la méthode `getHello()` renvoie bien "Hello World!"
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
