import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async root(): Promise<string> {
    return 'Hello World!';
  }

  @Get('greet/:name')
  public async greetMe(@Param('name') name: string): Promise<string> {
    return `Hello ${name}`;
  }

  @Get('hello')
  public async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}

