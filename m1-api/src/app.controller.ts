// Importation des décorateurs nécessaires depuis NestJS
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

// Déclaration d'un contrôleur avec le préfixe vide (endpoint racine)
@Controller('')
export class AppController {
  // Injection du service AppService via le constructeur
  constructor(private readonly appService: AppService) {}

  // Route GET à la racine ('/') qui renvoie un message simple
  @Get()
  public async root(): Promise<string> {
    return 'Hello World!'; // Retourne la chaîne "Hello World!"
  }

  // Route GET avec un paramètre dynamique 'name' (ex: '/greet/John')
  @Get('greet/:name')
  public async greetMe(@Param('name') name: string): Promise<string> {
    return `Hello ${name}`; // Retourne un message personnalisé avec le nom passé en paramètre
  }

  // Route GET sur '/hello' qui utilise le service AppService pour obtenir une réponse
  @Get('hello')
  public async getHello(): Promise<string> {
    return this.appService.getHello(); // Appelle la méthode `getHello` du service injecté
  }
}
