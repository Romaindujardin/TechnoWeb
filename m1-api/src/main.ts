// Importation des modules nécessaires pour démarrer l'application NestJS
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; // Le module principal de l'application
import { config } from 'dotenv'; // Pour charger les variables d'environnement depuis un fichier .env
import { ValidationPipe } from '@nestjs/common'; // Pour la validation globale des entrées

// Chargement des variables d'environnement depuis le fichier .env
config();

async function bootstrap() {
  // Création de l'application NestJS en utilisant le module principal
  const app = await NestFactory.create(AppModule);

  // Activation de la validation globale des données d'entrée via ValidationPipe
  app.useGlobalPipes(new ValidationPipe());

  // Activation de la gestion des CORS (Cross-Origin Resource Sharing)
  app.enableCors();

  // Démarrage du serveur sur le port spécifié dans les variables d'environnement
  await app.listen(process.env.PORT);

  // Log de confirmation indiquant que l'API écoute sur le port spécifié
  console.log(`🚀 API listening on PORT ${process.env.PORT}`);
}

// Lancement de l'application
bootstrap();
